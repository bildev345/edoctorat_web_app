package org.example.doctoratrestapi.professeur.professeurServices;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.dtos.professeur.CommissionCandidatListDto;
import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.commission.CommissionMapper;
import org.example.doctoratrestapi.mappers.sujet.SujetMapper;
import org.example.doctoratrestapi.models.*;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.repositories.*;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CommissionProfService {

    private final CommissionMapper commissionMappper;
    private final CommissionRepository commissionRepository;
    private final ProfesseurRepository profRepository;

    private final SujetRepository sujetRepository;
    private final PostulerRepository postulerRepository;
    private final ExaminerRepository examinerRepository;
    private final SujetMapper sujetMapper;

    public CommissionProfService(
            CommissionRepository commissionRepository,
            ProfesseurRepository profRep,
            CommissionMapper commissionMappper,
            SujetRepository sujetRepository,
            PostulerRepository postulerRepository,
            ExaminerRepository examinerRepository,
            SujetMapper sujetMapper
    ) {
        this.commissionRepository = commissionRepository;
        this.profRepository = profRep;
        this.commissionMappper = commissionMappper;
        this.sujetRepository = sujetRepository;
        this.postulerRepository = postulerRepository;
        this.examinerRepository = examinerRepository;
        this.sujetMapper = sujetMapper;
    }

    public List<CommissionDTO> getCommissionsByProfesseur() {

        long userProfId = SecurityUtils.currentUserId();

        ProfesseurModel prof = profRepository.findByUserId(userProfId)
                .orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable"));

        List<CommissionModel> profCommissions = commissionRepository.findByProfesseurId(prof.getId());

        if (profCommissions.isEmpty()) {
            throw new ResourceNotFoundException("Vous n'avez pas de commissions");
        }

        return profCommissions.stream().map(commissionMappper::toDto).toList();
    }

    public List<SujetDTO> getSujetsByCommission(Long commissionId) {

        Long userId = SecurityUtils.currentUserId();

        if (!commissionRepository.isProfMemberOfCommission(commissionId, userId)) {
            throw new ResourceNotFoundException("Vous n'êtes pas membre de cette commission");
        }

        CommissionModel commission = commissionRepository.findById(commissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Commission introuvable"));

        if (commission.getLaboratoire() == null) {
            throw new ResourceNotFoundException("Commission sans laboratoire");
        }

        Long laboId = commission.getLaboratoire().getId();

        List<SujetModel> sujets = sujetRepository.getSujetsByLaboId(laboId);
        if (sujets.isEmpty()) {
            throw new ResourceNotFoundException("Aucun sujet pour cette commission");
        }

        return sujets.stream().map(sujetMapper::toDTO).toList();
    }

    public List<CommissionCandidatListDto> getCandidatsByCommissionSujet(Long commissionId, Long sujetId) {

        Long userId = SecurityUtils.currentUserId();

        if (!commissionRepository.isProfMemberOfCommission(commissionId, userId)) {
            throw new ResourceNotFoundException("Vous n'êtes pas membre de cette commission");
        }

        CommissionModel commission = commissionRepository.findById(commissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Commission introuvable"));

        if (commission.getLaboratoire() == null) {
            throw new ResourceNotFoundException("Commission sans laboratoire");
        }

        Long laboId = commission.getLaboratoire().getId();

        if (!sujetRepository.existsByIdAndLaboId(sujetId, laboId)) {
            throw new ResourceNotFoundException("Sujet n'appartient pas au labo de la commission");
        }

        List<PostulerModel> postulures = postulerRepository.findBySujetIdWithCandidat(sujetId);
        if (postulures.isEmpty()) {
            throw new ResourceNotFoundException("Aucun candidat n'a postulé à ce sujet");
        }

        List<ExaminerModel> exams = examinerRepository.findByCommissionIdAndSujetId(commissionId, sujetId);

        Map<Long, ExaminerModel> examByCandidat = exams.stream()
                .filter(e -> e.getCandidat() != null)
                .collect(Collectors.toMap(e -> e.getCandidat().getId(), e -> e, (a, b) -> a));

        return postulures.stream().map(p -> {
            var c = p.getCandidatModel();
            var ex = examByCandidat.get(c.getId());

            return new CommissionCandidatListDto(
                    c.getId(),
                    c.getCne(),
                    c.getNomCandidatArabe(),
                    c.getPrenomCandidatArabe(),
                    ex == null ? null : ex.getNoteDossier(),
                    ex == null ? null : ex.getNoteEntretien(),
                    ex == null ? null : ex.getDecision(),
                    ex == null ? null : ex.isValider()
            );
        }).toList();
    }

    public byte[] generatePvPdf(Long commissionId, Long sujetId) {

        Long userId = SecurityUtils.currentUserId();

        if (!commissionRepository.isProfMemberOfCommission(commissionId, userId)) {
            throw new ResourceNotFoundException("Vous n'êtes pas membre de cette commission");
        }

        CommissionModel commission = commissionRepository.findById(commissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Commission introuvable"));

        SujetModel sujet = sujetRepository.findById(sujetId)
                .orElseThrow(() -> new ResourceNotFoundException("Sujet introuvable"));

        if (commission.getLaboratoire() == null) {
            throw new ResourceNotFoundException("Commission sans laboratoire");
        }

        Long laboId = commission.getLaboratoire().getId();

        if (!sujetRepository.existsByIdAndLaboId(sujetId, laboId)) {
            throw new ResourceNotFoundException("Sujet n'appartient pas au labo de la commission");
        }

        // ✅ ton repo join fetch candidat (OK)
        List<ExaminerModel> exams = examinerRepository.findByCommissionIdAndSujetId(commissionId, sujetId);
        if (exams.isEmpty()) {
            throw new ResourceNotFoundException("Aucune examination pour ce sujet");
        }

        return buildPdf(commission, sujet, exams);
    }

    private byte[] buildPdf(CommissionModel commission, SujetModel sujet, List<ExaminerModel> exams) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            // ✅ Charger police arabe depuis resources
            Font arabicFont = loadArabicFont(11, Font.NORMAL);
            Font arabicHeaderFont = loadArabicFont(11, Font.BOLD);

            Font titleFont = new Font(Font.HELVETICA, 16, Font.BOLD);
            Font normalFont = new Font(Font.HELVETICA, 11, Font.NORMAL);
            Font headerFont = new Font(Font.HELVETICA, 11, Font.BOLD);

            Document document = new Document(PageSize.A4, 36, 36, 36, 36);
            PdfWriter writer = PdfWriter.getInstance(document, baos);
            document.open();

            document.add(new Paragraph("PV - Examinations (par sujet)", titleFont));
            document.add(new Paragraph(" ", normalFont));

            DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String date = (commission.getDateCommission() != null) ? commission.getDateCommission().format(df) : "-";
            String lieu = (commission.getLieu() != null) ? commission.getLieu() : "-";
            String labo = (commission.getLaboratoire() != null) ? commission.getLaboratoire().getNomLaboratoire() : "-";

            document.add(new Paragraph("Date : " + date + " | Lieu : " + lieu, normalFont));
            document.add(new Paragraph("Laboratoire : " + labo, normalFont));
            document.add(new Paragraph("Sujet : " + nvl(sujet.getTitre()), normalFont));
            document.add(new Paragraph(" ", normalFont));

            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{2.2f, 2.2f, 2.2f, 1.5f, 1.5f, 1.7f});

            // ✅ Important RTL pour arabe (Nom/Prénom)
            table.setRunDirection(PdfWriter.RUN_DIRECTION_RTL);

            addHeader(table, "CNE", headerFont);
            addHeader(table, "Nom", headerFont);
            addHeader(table, "Prénom", headerFont);
            addHeader(table, "Note dossier", headerFont);
            addHeader(table, "Note entretien", headerFont);
            addHeader(table, "Décision", headerFont);

            for (ExaminerModel ex : exams) {
                var c = ex.getCandidat();

                String nd = (ex.getNoteDossier() == 0f) ? "" : String.valueOf(ex.getNoteDossier());
                String ne = (ex.getNoteEntretien() == 0) ? "" : String.valueOf(ex.getNoteEntretien());

                // ✅ CNE (latin)
                addCell(table, nvl(c != null ? c.getCne() : ""), normalFont, Element.ALIGN_CENTER, PdfWriter.RUN_DIRECTION_LTR);

                // ✅ Nom/Prénom (arabe)
                addCell(table, nvl(c != null ? c.getNomCandidatArabe() : ""), arabicFont, Element.ALIGN_CENTER, PdfWriter.RUN_DIRECTION_RTL);
                addCell(table, nvl(c != null ? c.getPrenomCandidatArabe() : ""), arabicFont, Element.ALIGN_CENTER, PdfWriter.RUN_DIRECTION_RTL);

                // ✅ Notes + décision
                addCell(table, nd, normalFont, Element.ALIGN_CENTER, PdfWriter.RUN_DIRECTION_LTR);
                addCell(table, ne, normalFont, Element.ALIGN_CENTER, PdfWriter.RUN_DIRECTION_LTR);
                addCell(table, nvl(ex.getDecision()), normalFont, Element.ALIGN_CENTER, PdfWriter.RUN_DIRECTION_LTR);
            }

            document.add(table);
            document.close();
            writer.close();

            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Erreur génération PV PDF: " + e.getMessage(), e);
        }
    }

    private Font loadArabicFont(float size, int style) {
        try {
            // ⚠️ mets le fichier ici: src/main/resources/fonts/Amiri-Regular.ttf
            ClassPathResource res = new ClassPathResource("fonts/Amiri-Regular.ttf");
            try (InputStream is = res.getInputStream()) {
                byte[] bytes = is.readAllBytes();
                BaseFont bf = BaseFont.createFont(
                        "Amiri-Regular.ttf",
                        BaseFont.IDENTITY_H,
                        BaseFont.EMBEDDED,
                        true,
                        bytes,
                        null
                );
                return new Font(bf, size, style);
            }
        } catch (Exception e) {
            // fallback (mais sans arabe)
            return new Font(Font.HELVETICA, size, style);
        }
    }

    private void addHeader(PdfPTable table, String txt, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(txt, font));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.addCell(cell);
    }

    private void addCell(PdfPTable table, String txt, Font font, int hAlign, int runDir) {
        PdfPCell cell = new PdfPCell(new Phrase(txt, font));
        cell.setHorizontalAlignment(hAlign);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setRunDirection(runDir);
        table.addCell(cell);
    }

    private String nvl(String s) {
        return s == null ? "" : s;
    }
}
