package org.example.doctoratrestapi.mappers.commission;

import org.example.doctoratrestapi.models.*;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.springframework.stereotype.Component;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

@Component
public class CommissionMapper {

    public CommissionDTO toDto(CommissionModel commission) {
        if (commission == null) {
            return null;
        }

        long commissionId = commission.getId();
        LocalDate dateCommission = commission.getDateCommission();
        String lieu = commission.getLieu();
        Time heure = commission.getHeure();

        // =============================
        // Membres de la commission
        // =============================
        List<String> membresNames = commission.getCommissionProfesseurs()
                .stream()
                .map(CommissionProfesseurModel::getProfesseur)
                .map(p -> p.getUser().getFirstName() + " " + p.getUser().getLastName())
                .toList();

        // =============================
        // Sujets liés INDIRECTEMENT
        // (via professeurs)
        // =============================
        List<String> sujetsTitres = commission.getCommissionProfesseurs()
                .stream()
                .flatMap(cp -> cp.getProfesseur().getSujets().stream())
                .map(SujetModel::getTitre)
                .distinct()
                .toList();

        return new CommissionDTO(
                commissionId,
                dateCommission,
                lieu,
                heure,
                sujetsTitres,
                membresNames
        );
    }

    public List<CommissionDTO> toDtoList(List<CommissionModel> commissions) {
        return commissions.stream()
                .map(this::toDto)
                .toList();
    }
}


