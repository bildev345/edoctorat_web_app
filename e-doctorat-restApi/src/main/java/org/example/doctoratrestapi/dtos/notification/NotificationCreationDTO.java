package org.example.doctoratrestapi.dtos.notification;

public record NotificationCreationDTO(
        String type,
        Long candidatId,
        long sujetId,
        long commissionId
) {
}
