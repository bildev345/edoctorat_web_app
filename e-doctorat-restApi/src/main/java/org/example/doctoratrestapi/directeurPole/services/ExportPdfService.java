package org.example.doctoratrestapi.directeurPole.services;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.example.doctoratrestapi.models.ExaminerModel;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.doctoratrestapi.repositories.ExaminerRepository;
import org.example.doctoratrestapi.directeurCed.CedRepository;
import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j  // Ajouter cette annotation Lombok pour les logs
public class ExportPdfService {

    private final ExaminerRepository examinerRepository;
    private final CedRepository cedRepository;
    
    public byte[] generateResultatsPdf(String decision) {
        log.info("=== DÉBUT generateResultatsPdf pour decision: {} ===", decision);
    
        try {
            // Validation de la décision
            if (!decision.equals("LP") && !decision.equals("LA")) {
                log.error("Décision invalide: {}", decision);
                throw new IllegalArgumentException("Décision invalide. Utilisez 'LP' ou 'LA'.");
            }

        // Récupérer les IDs des CEDs
        log.info("Récupération des IDs des CEDs...");
        List<Long> cedIds = cedRepository.findAllCedIds();
        log.info("Nombre de CEDs trouvés: {}, IDs: {}", cedIds.size(), cedIds);
        
        if (cedIds.isEmpty()) {
            log.warn("Aucun CED trouvé!");
        }
        
        // Récupérer les examens
        log.info("Récupération des examens pour decision={}, cedIds={}", decision, cedIds);
        Pageable unpaged = PageRequest.of(0, Integer.MAX_VALUE);
        
        // ✅ CORRECTION ICI : Créer une nouvelle liste modifiable
        List<ExaminerModel> examens = new ArrayList<>(
            examinerRepository.findByDecisionForPole(cedIds, decision, unpaged).getContent()
        );
        
        log.info("Nombre d'examens trouvés: {}", examens.size());
        
        if (examens.isEmpty()) {
            log.error("Aucun résultat publié pour la décision {}", decision);
            throw new RuntimeException("Aucun résultat publié pour la décision " + decision);
        }
        
        // Log des premiers examens pour debug
        if (!examens.isEmpty()) {
            ExaminerModel premier = examens.get(0);
            log.info("Premier examen - ID: {}, Candidat: {}, Moyenne: {}", 
                premier.getId(),
                premier.getCandidat() != null ? premier.getCandidat().getCne() : "NULL",
                premier.getMoyenneGenerale()
            );
        }
        
        // Trier (maintenant possible car la liste est modifiable)
        log.info("Tri des examens par moyenne...");
        examens.sort((e1, e2) -> {
            Double m1 = e1.getMoyenneGenerale();
            Double m2 = e2.getMoyenneGenerale();
            if (m1 == null && m2 == null) return 0;
            if (m1 == null) return 1;
            if (m2 == null) return -1;
            return Double.compare(m2, m1);
        });
        log.info("Tri terminé");
        
        // Génération du PDF
        log.info("Début de génération du PDF...");
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        
        Document document = new Document(PageSize.A4.rotate(), 36, 36, 54, 54);
        PdfWriter.getInstance(document, out);
        
        document.open();
        log.info("Document PDF ouvert");
        
        addHeader(document, decision, "Résultats du Pôle");
        log.info("Header ajouté");
        
        addResultsTable(document, examens, decision);
        log.info("Table ajoutée");
        
        addFooter(document);
        log.info("Footer ajouté");
        
        document.close();
        log.info("Document PDF fermé, taille: {} bytes", out.size());
        
        log.info("=== FIN generateResultatsPdf - SUCCÈS ===");
        return out.toByteArray();
        
    } catch (Exception e) {
        log.error("=== ERREUR dans generateResultatsPdf ===", e);
        log.error("Message: {}", e.getMessage());
        log.error("Cause: {}", e.getCause());
        throw new RuntimeException("Erreur lors de la génération du PDF: " + e.getMessage(), e);
    }
}        
    
    private void addHeader(Document document, String decision, String nomPole) throws DocumentException {
        log.debug("Ajout du header...");
        try {
            Paragraph title = new Paragraph();
            title.setAlignment(Element.ALIGN_CENTER);
            
            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD, new Color(0, 51, 102));
            Font subtitleFont = new Font(Font.HELVETICA, 14, Font.NORMAL, new Color(60, 60, 60));
            Font poleFont = new Font(Font.HELVETICA, 12, Font.BOLD, new Color(0, 102, 0));
            
            title.add(new Chunk("UNIVERSITÉ USMBA\n", titleFont));
            title.add(new Chunk("Formation Doctorale\n", subtitleFont));
            title.add(new Chunk(nomPole + "\n\n", poleFont));
            
            String listeType = decision.equals("LP") ? "Liste Principale" : "Liste d'Attente";
            Font listeTitleFont = new Font(Font.HELVETICA, 16, Font.BOLD, Color.BLACK);
            title.add(new Chunk("RÉSULTATS - " + listeType.toUpperCase() + "\n", listeTitleFont));
            
            Font dateFont = new Font(Font.HELVETICA, 10, Font.ITALIC, Color.GRAY);
            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            title.add(new Chunk("Date de publication: " + currentDate + "\n\n", dateFont));
            
            document.add(title);
            
            Paragraph separator = new Paragraph("_".repeat(120));
            separator.setAlignment(Element.ALIGN_CENTER);
            separator.setSpacingAfter(15);
            document.add(separator);
            
            log.debug("Header ajouté avec succès");
        } catch (Exception e) {
            log.error("Erreur dans addHeader", e);
            throw e;
        }
    }
    
    private void addResultsTable(Document document, List<ExaminerModel> examens, String decision) throws DocumentException {
        log.debug("Ajout de la table avec {} examens", examens.size());
        
        try {
            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);
            
            float[] columnWidths = {0.8f, 1.5f, 3f, 4f, 3f, 1.2f};
            table.setWidths(columnWidths);
            
            Font headerFont = new Font(Font.HELVETICA, 10, Font.BOLD, Color.WHITE);
            Color headerColor = new Color(0, 51, 102);
            
            addTableHeader(table, "N°", headerFont, headerColor);
            addTableHeader(table, "CNE", headerFont, headerColor);
            addTableHeader(table, "Candidat", headerFont, headerColor);
            addTableHeader(table, "Sujet", headerFont, headerColor);
            addTableHeader(table, "Laboratoire", headerFont, headerColor);
            addTableHeader(table, "Moyenne", headerFont, headerColor);
            
            Font dataFont = new Font(Font.HELVETICA, 9, Font.NORMAL, Color.BLACK);
            Font dataBoldFont = new Font(Font.HELVETICA, 9, Font.BOLD, Color.BLACK);
            
            int index = 1;
            for (ExaminerModel examen : examens) {
                try {
                    log.debug("Traitement examen {}/{} - ID: {}", index, examens.size(), examen.getId());
                    
                    addTableCell(table, String.valueOf(index++), dataFont, Element.ALIGN_CENTER);
                    
                    String cne = "N/A";
                    if (examen.getCandidat() != null && examen.getCandidat().getCne() != null) {
                        cne = examen.getCandidat().getCne();
                    }
                    addTableCell(table, cne, dataFont, Element.ALIGN_CENTER);
                    
                    String fullName = "N/A";
                    if (examen.getCandidat() != null && examen.getCandidat().getUser() != null) {
                        String firstName = examen.getCandidat().getUser().getFirstName();
                        String lastName = examen.getCandidat().getUser().getLastName();
                        fullName = ((firstName != null ? firstName : "") + " " + (lastName != null ? lastName : "")).trim();
                        if (fullName.isEmpty()) fullName = "N/A";
                    }
                    addTableCell(table, fullName, dataBoldFont, Element.ALIGN_LEFT);
                    
                    String titre = "N/A";
                    if (examen.getSujet() != null && examen.getSujet().getTitre() != null) {
                        titre = examen.getSujet().getTitre();
                    }
                    addTableCell(table, titre, dataFont, Element.ALIGN_LEFT);
                    
                    String laboratoire = "N/A";
                    if (examen.getCommission() != null 
                        && examen.getCommission().getLaboratoire() != null 
                        && examen.getCommission().getLaboratoire().getNomLaboratoire() != null) {
                        laboratoire = examen.getCommission().getLaboratoire().getNomLaboratoire();
                    }
                    addTableCell(table, laboratoire, dataFont, Element.ALIGN_LEFT);
                    
                    String moyenne = "N/A";
                    Font moyenneFont = dataFont;
                    
                    Double moyenneValue = examen.getMoyenneGenerale();
                    if (moyenneValue != null) {
                        moyenne = String.format("%.2f/20", moyenneValue);
                        
                        if (moyenneValue >= 14.0) {
                            moyenneFont = new Font(Font.HELVETICA, 9, Font.BOLD, new Color(0, 128, 0));
                        } else if (moyenneValue >= 12.0) {
                            moyenneFont = new Font(Font.HELVETICA, 9, Font.BOLD, new Color(255, 140, 0));
                        }
                    }
                    
                    addTableCell(table, moyenne, moyenneFont, Element.ALIGN_CENTER);
                    
                } catch (Exception e) {
                    log.error("Erreur lors du traitement de l'examen ID {}", examen.getId(), e);
                    // Continue avec les autres
                }
            }
            
            document.add(table);
            log.debug("Table ajoutée avec succès");
            
            addStatistics(document, examens, decision);
            log.debug("Statistiques ajoutées");
            
        } catch (Exception e) {
            log.error("Erreur dans addResultsTable", e);
            throw e;
        }
    }
    
    private void addTableHeader(PdfPTable table, String text, Font font, Color bgColor) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBackgroundColor(bgColor);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setPadding(8);
        cell.setBorderWidth(1);
        table.addCell(cell);
    }
    
    private void addTableCell(PdfPTable table, String text, Font font, int alignment) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setHorizontalAlignment(alignment);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setPadding(6);
        cell.setBorderWidth(0.5f);
        cell.setBorderColor(Color.LIGHT_GRAY);
        table.addCell(cell);
    }
    
    private void addStatistics(Document document, List<ExaminerModel> examens, String decision) throws DocumentException {
        log.debug("Ajout des statistiques...");
        
        Paragraph stats = new Paragraph();
        stats.setSpacingBefore(20);
        
        Font statsFont = new Font(Font.HELVETICA, 10, Font.BOLD, new Color(0, 51, 102));
        Font normalFont = new Font(Font.HELVETICA, 10, Font.NORMAL);
        
        String listeType = decision.equals("LP") ? "Liste Principale" : "Liste d'Attente";
        
        stats.add(new Chunk("═══ STATISTIQUES - " + listeType + " ═══\n\n", statsFont));
        
        stats.add(new Chunk("Nombre total de candidats: ", statsFont));
        stats.add(new Chunk(String.valueOf(examens.size()) + "\n", normalFont));
        
        if (!examens.isEmpty()) {
            List<ExaminerModel> examensAvecNote = examens.stream()
                    .filter(e -> e.getMoyenneGenerale() != null)
                    .toList();
            
            log.debug("Examens avec note: {}/{}", examensAvecNote.size(), examens.size());
            
            if (!examensAvecNote.isEmpty()) {
                double moyenneNotes = examensAvecNote.stream()
                        .mapToDouble(ExaminerModel::getMoyenneGenerale)
                        .average()
                        .orElse(0.0);
                
                stats.add(new Chunk("Moyenne générale: ", statsFont));
                stats.add(new Chunk(String.format("%.2f/20\n", moyenneNotes), normalFont));
                
                double noteMax = examensAvecNote.stream()
                        .mapToDouble(ExaminerModel::getMoyenneGenerale)
                        .max()
                        .orElse(0.0);
                
                stats.add(new Chunk("Note maximale: ", statsFont));
                stats.add(new Chunk(String.format("%.2f/20\n", noteMax), normalFont));
                
                double noteMin = examensAvecNote.stream()
                        .mapToDouble(ExaminerModel::getMoyenneGenerale)
                        .min()
                        .orElse(0.0);
                
                stats.add(new Chunk("Note minimale: ", statsFont));
                stats.add(new Chunk(String.format("%.2f/20\n", noteMin), normalFont));
            }
            
            long nbLaboratoires = examens.stream()
                    .filter(e -> e.getCommission() != null 
                              && e.getCommission().getLaboratoire() != null 
                              && e.getCommission().getLaboratoire().getNomLaboratoire() != null)
                    .map(e -> e.getCommission().getLaboratoire().getNomLaboratoire())
                    .distinct()
                    .count();
            
            stats.add(new Chunk("Nombre de laboratoires représentés: ", statsFont));
            stats.add(new Chunk(String.valueOf(nbLaboratoires) + "\n", normalFont));
        }
        
        document.add(stats);
        log.debug("Statistiques ajoutées avec succès");
    }
    
    private void addFooter(Document document) throws DocumentException {
        log.debug("Ajout du footer...");
        
        Paragraph footer = new Paragraph();
        footer.setSpacingBefore(30);
        footer.setAlignment(Element.ALIGN_CENTER);
        
        Font footerFont = new Font(Font.HELVETICA, 8, Font.ITALIC, Color.GRAY);
        
        footer.add(new Chunk("_".repeat(120) + "\n", footerFont));
        footer.add(new Chunk("Ce document est généré automatiquement par le système de gestion des doctorats\n", footerFont));
        footer.add(new Chunk("Pour toute réclamation, veuillez contacter l'administration dans un délai de 48 heures\n", footerFont));
        footer.add(new Chunk("Document confidentiel - Réservé à l'usage interne\n", footerFont));
        
        document.add(footer);
        log.debug("Footer ajouté avec succès");
    }
}