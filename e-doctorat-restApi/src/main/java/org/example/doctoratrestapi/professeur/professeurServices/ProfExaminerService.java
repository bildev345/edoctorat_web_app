package org.example.doctoratrestapi.professeur.professeurServices;

import org.example.doctoratrestapi.candidat.CandidatRepository;
import org.example.doctoratrestapi.dtos.examination.ExaminationCreationDTO;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.examiner.ExaminerMapper;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.CommissionModel;
import org.example.doctoratrestapi.models.ExaminerModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.example.doctoratrestapi.models.enums.DecisionEnum;
import org.example.doctoratrestapi.repositories.CommissionRepository;
import org.example.doctoratrestapi.repositories.ExaminerRepository;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

@Service
public class ProfExaminerService {

    private final ExaminerRepository examinerRepository;
    private final CommissionRepository commissionRepository;
    private final CandidatRepository candidatRepository;
    private final SujetRepository sujetRepository;
    private final ExaminerMapper examinerMapper;

    public ProfExaminerService(
            ExaminerRepository examinerRepository,
            CommissionRepository commissionRepository,
            CandidatRepository candidatRepository,
            SujetRepository sujetRepository,
            ExaminerMapper examinerMapper
    ) {
        this.examinerRepository = examinerRepository;
        this.commissionRepository = commissionRepository;
        this.candidatRepository = candidatRepository;
        this.sujetRepository = sujetRepository;
        this.examinerMapper = examinerMapper;
    }

    // ✅ validation centralisée
    private void assertDecisionValid(String decision) {
        if (decision == null || decision.isBlank()) {
            throw new IllegalArgumentException("Decision obligatoire");
        }
        if (!DecisionEnum.isValid(decision)) {
            throw new IllegalArgumentException("Decision invalide: " + decision);
        }
    }

    // ✅ GET: retourne l'exam si existe, sinon null
    public ExaminationDTO getExamination(Long commissionId, Long sujetId, Long candidatId) {

        Long currentUserId = SecurityUtils.currentUserId();

        boolean member = commissionRepository.isProfMemberOfCommission(commissionId, currentUserId);
        if (!member) throw new ResourceNotFoundException("Vous n'êtes pas membre de cette commission");

        candidatRepository.findById(candidatId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidat non trouvé"));
        commissionRepository.findById(commissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Commission non trouvée"));
        sujetRepository.findById(sujetId)
                .orElseThrow(() -> new ResourceNotFoundException("Sujet non trouvé"));

        return examinerRepository
                .findOneByCommissionIdAndSujetIdAndCandidatId(commissionId, sujetId, candidatId)
                .map(examinerMapper::toDto)
                .orElse(null);
    }

    // ✅ POST: create seulement (si existe déjà => erreur)
    public ExaminationDTO createExamination(Long commissionId, Long sujetId, Long candidatId, ExaminationCreationDTO dto) {

        Long currentUserId = SecurityUtils.currentUserId();

        boolean member = commissionRepository.isProfMemberOfCommission(commissionId, currentUserId);
        if (!member) throw new ResourceNotFoundException("Vous n'êtes pas membre de cette commission");

        boolean exists = examinerRepository.existsByCommissionIdAndSujetIdAndCandidatId(commissionId, sujetId, candidatId);
        if (exists) {
            // ✅ mieux que RuntimeException
            throw new IllegalArgumentException("Examination existe déjà (utilisez PUT)");
        }

        // ✅ validation decision
        assertDecisionValid(dto.getDecision());

        CandidatModel candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidat non trouvé"));

        CommissionModel commission = commissionRepository.findById(commissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Commission non trouvée"));

        SujetModel sujet = sujetRepository.findById(sujetId)
                .orElseThrow(() -> new ResourceNotFoundException("Sujet non trouvé"));

        ExaminerModel entity = examinerMapper.toEntity(dto);
        entity.setCandidat(candidat);
        entity.setCommission(commission);
        entity.setSujet(sujet);

        // ✅ au cas où mapper ne set pas decision bien (sécurité)
        entity.setDecision(dto.getDecision());

        ExaminerModel saved = examinerRepository.save(entity);
        return examinerMapper.toDto(saved);
    }

    // ✅ PUT: update seulement
    public ExaminationDTO updateExamination(Long commissionId, Long sujetId, Long candidatId, ExaminationCreationDTO dto) {

        Long currentUserId = SecurityUtils.currentUserId();

        boolean member = commissionRepository.isProfMemberOfCommission(commissionId, currentUserId);
        if (!member) throw new ResourceNotFoundException("Vous n'êtes pas membre de cette commission");

        ExaminerModel existing = examinerRepository
                .findOneByCommissionIdAndSujetIdAndCandidatId(commissionId, sujetId, candidatId)
                .orElseThrow(() -> new ResourceNotFoundException("Aucune examination à modifier (utilisez POST)"));

        // validation decision
        assertDecisionValid(dto.getDecision());

        existing.setDecision(dto.getDecision());
        existing.setNoteDossier(dto.getNoteDossier());
        existing.setNoteEntretien(dto.getNoteEntretien());
        existing.setPublier(dto.isPublier());
        existing.setValider(dto.isValider());

        ExaminerModel saved = examinerRepository.save(existing);
        return examinerMapper.toDto(saved);
    }
}
