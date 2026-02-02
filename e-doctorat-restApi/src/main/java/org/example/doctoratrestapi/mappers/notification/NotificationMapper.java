package org.example.doctoratrestapi.mappers.notification;

import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.CommissionModel;
import org.example.doctoratrestapi.models.NotificationModel;
import org.example.doctoratrestapi.dtos.notification.NotificationCreationDTO;
import org.example.doctoratrestapi.dtos.notification.NotificationDTO;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {

    public NotificationDTO toDto(NotificationModel entity) {
        if (entity == null) return null;

        Long commissionId = entity.getCommission() != null
                ? entity.getCommission().getId()
                : null;

        Long sujetId = entity.getSujet() != null
                ? entity.getSujet().getId()
                : null;

        return new NotificationDTO(
                entity.getId(),
                entity.getType(),
                commissionId,
                sujetId
        );
    }

    public NotificationModel toEntity(
            NotificationCreationDTO dto,
            CandidatModel candidat,
            CommissionModel commission,
            SujetModel sujet
    ) {
        if (dto == null) return null;

        NotificationModel notification = new NotificationModel();
        notification.setType(dto.type());
        notification.setCandidat(candidat);
        notification.setCommission(commission);
        notification.setSujet(sujet);
        return notification;
    }
}
