package org.example.doctoratrestapi.dtos.notification;

import org.example.doctoratrestapi.dtos.sujet.SujetCandidatsDto;
import org.example.doctoratrestapi.utils.NotificationType;

import java.util.List;

public record NotificationBulkCreationDto(
        Long commissionId,
        String type, // ex: CONVOCATION, REFUS, RESULTAT
        List<SujetCandidatsDto> sujetsCandidats
) {
    public NotificationBulkCreationDto {
        if (commissionId == null) {
            throw new IllegalArgumentException("CommissionId est obligatoire");
        }
        if (sujetsCandidats == null || sujetsCandidats.isEmpty()) {
            throw new IllegalArgumentException("Aucun sujet sélectionné");
        }
    }
}
