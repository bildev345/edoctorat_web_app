package org.example.doctoratrestapi.mappers.resultat;

import org.example.doctoratrestapi.dtos.resultat.ResultatPoleDto;
import org.example.doctoratrestapi.models.ExaminerModel;
import org.springframework.stereotype.Component;

@Component
public class ResultatPoleMapper {
    public ResultatPoleDto toDto(ExaminerModel e) {
        String fullName = e.getCandidat().getUser().getFirstName() + " "  + e.getCandidat().getUser().getLastName();
        String laboratoire = e.getCommission().getLaboratoire().getNomLaboratoire();
        
        return new ResultatPoleDto(
                e.getId(),
                e.getCandidat().getCne(),
                fullName,
                e.getSujet().getTitre(),
                laboratoire,
                e.getMoyenneGenerale(),
                e.getDecision(),
                e.isPublier()
        );
    }
}