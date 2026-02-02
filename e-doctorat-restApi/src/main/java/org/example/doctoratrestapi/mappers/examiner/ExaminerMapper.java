package org.example.doctoratrestapi.mappers.examiner;

import org.example.doctoratrestapi.dtos.examination.ExaminationCreationDTO;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.dtos.examination.ResultatExaminationDto;
import org.example.doctoratrestapi.models.ExaminerModel;
import org.springframework.stereotype.Component;

@Component
public class ExaminerMapper {

    /**
     * Entity -> DTO
     * Sert pour afficher une examination au front.
     */
    public ExaminationDTO toDto(ExaminerModel entity) {
        Long candidatId = entity.getCandidat() != null ? entity.getCandidat().getId() : null;
        Long commissionId = entity.getCommission() != null ? entity.getCommission().getId() : null;
        Long sujetId = entity.getSujet() != null ? entity.getSujet().getId() : null;

        return new ExaminationDTO(
                entity.getId(),
                entity.getDecision(),
                entity.getNoteDossier(),
                entity.getNoteEntretien(),
                entity.isPublier(),
                entity.isValider(),
                candidatId,
                commissionId,
                sujetId
        );
    }

    /**
     * DTO -> Entity
     * ⚠️ IMPORTANT : ici on ne met pas candidat/commission/sujet.
     * Ces relations seront chargées puis attachées dans le service.
     */
    public ExaminerModel toEntity(ExaminationCreationDTO dto) {
        ExaminerModel entity = new ExaminerModel();
        entity.setDecision(dto.getDecision());
        entity.setNoteDossier(dto.getNoteDossier());
        entity.setNoteEntretien(dto.getNoteEntretien());
        entity.setValider(dto.isValider());
        return entity;
    }
    public ResultatExaminationDto toResultatExaminationDto(ExaminerModel examinerModel){
        String fullName = examinerModel.getCandidat().getNomCandidatArabe() + ' ' +examinerModel.getCandidat().getPrenomCandidatArabe();
        return new ResultatExaminationDto(
                examinerModel.getId(),
                examinerModel.getCandidat().getCne(),
                fullName,
                examinerModel.getSujet().getTitre(),
                examinerModel.getNoteDossier(),
                examinerModel.getNoteEntretien(),
                examinerModel.getMoyenneGenerale(),
                examinerModel.getDecision()
        );
    }

}
