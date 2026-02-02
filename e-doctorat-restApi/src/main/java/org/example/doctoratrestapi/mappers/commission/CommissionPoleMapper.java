package org.example.doctoratrestapi.mappers.commission;

import org.example.doctoratrestapi.dtos.commission.CommissionPoleDto;
import org.example.doctoratrestapi.models.CommissionModel;
import org.example.doctoratrestapi.models.ExaminerModel;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CommissionPoleMapper {

    public CommissionPoleDto toDto(CommissionModel commission) {
        // 1. Extract Members (Professeurs)
        var membres = commission.getCommissionProfesseurs().stream()
                .map(cp -> cp.getProfesseur().getUser().getFirstName() + " " + cp.getProfesseur().getUser().getLastName())
                .collect(Collectors.toList());

        // 2. Extract Subjects (via Examiners table)
        // A commission might examine multiple subjects, we join them with a comma
        String sujets = "N/A";
        if (commission.getExaminers() != null && !commission.getExaminers().isEmpty()) {
            sujets = commission.getExaminers().stream()
                    .map(ExaminerModel::getSujet)
                    .map(s -> s.getTitre())
                    .distinct() // Avoid duplicates if multiple candidates have same subject
                    .collect(Collectors.joining(", "));
        }

        return new CommissionPoleDto(
                commission.getId(),
                commission.getDateCommission(),
                commission.getHeure(),
                commission.getLieu(),
                sujets,
                membres,
                commission.getLaboratoire().getNomLaboratoire(),
                commission.getLaboratoire().getCed() != null ? commission.getLaboratoire().getCed().getTitre() : ""
        );
    }
}