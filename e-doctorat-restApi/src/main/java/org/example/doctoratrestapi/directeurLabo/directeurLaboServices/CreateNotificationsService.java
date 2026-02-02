package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.candidat.CandidatRepository;
import org.example.doctoratrestapi.repositories.CommissionRepository;
import org.example.doctoratrestapi.dtos.notification.NotificationBulkCreationDto;
import org.example.doctoratrestapi.dtos.sujet.SujetCandidatsDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.CommissionModel;
import org.example.doctoratrestapi.models.NotificationModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.example.doctoratrestapi.repositories.NotificationRepository;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CreateNotificationsService {
    private final NotificationRepository notificationRepo;
    private final CandidatRepository candidatRepo;
    private final SujetRepository sujetRepo;
    private final CommissionRepository commissionRepo;

    public void createBulkNotifications(NotificationBulkCreationDto dto){
        long userId = SecurityUtils.currentUserId();

        // fetcher la commission
        CommissionModel commission = commissionRepo.findById(dto.commissionId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "La commission avec l'id: " + dto.commissionId() + " n'existe pas"
                ));
        // valider que l'utilisateur est bien le directeur de labo => à implementer aprés

        // récuprer les Ids des sujets et les candidats Ids spécifiques
        List<Long> allSujetsIds = dto.sujetsCandidats().stream()
                .map(SujetCandidatsDto::sujetId)
                .distinct()
                .toList();
        List<Long> allCandidatsIds = dto.sujetsCandidats().stream()
                .flatMap(sc -> sc.candidatIds().stream())
                .distinct()
                .toList();

        // fetcher tous les sujets et candidats dans un batch
        Map<Long, SujetModel> sujetsMap = fetchSujetsAsMap(allSujetsIds);
        Map<Long, CandidatModel> candidatsMap = fetchCandidatsAsMap(allCandidatsIds);


        //créer tous les notifications
        List<NotificationModel> allNotifications = new ArrayList<>();
        for(SujetCandidatsDto sujetCandidats : dto.sujetsCandidats()){
            Long sujetId = sujetCandidats.sujetId();
            SujetModel sujet = sujetsMap.get(sujetId);
            if(sujet == null){
                throw new ResourceNotFoundException("Le sujet avec l'id " + sujetId + " n'existe pas");
            }

            // créer les notifications pour ce sujet

            for(Long candidatId : sujetCandidats.candidatIds()){
                CandidatModel candidat = candidatsMap.get(candidatId);
                if(candidat == null){
                    throw new ResourceNotFoundException("Le candidat avec l'id: " + candidatId + " n'existe pas");

                }
                NotificationModel notification = createNotification(candidat, sujet, commission, dto.type());
                allNotifications.add(notification);
            }

        }
        notificationRepo.saveAll(allNotifications);
    }

    private NotificationModel createNotification(CandidatModel candidat, SujetModel sujet, CommissionModel commission, String type) {
        NotificationModel notification = new NotificationModel();
        notification.setCandidat(candidat);
        notification.setSujet(sujet);
        notification.setCommission(commission);
        notification.setType(type);
        return notification;
    }

    private Map<Long, CandidatModel> fetchCandidatsAsMap(List<Long> candidatIds) {
        List<CandidatModel> candidats = candidatRepo.findAllById(candidatIds);

        if (candidats.size() != candidatIds.size()) {
            Set<Long> foundIds = candidats.stream()
                    .map(CandidatModel::getId)
                    .collect(Collectors.toSet());
            List<Long> missingIds = candidatIds.stream()
                    .filter(id -> !foundIds.contains(id))
                    .toList();
            throw new ResourceNotFoundException("Les candidats avec les Ids " + missingIds + " n'existent pas");
        }

        return candidats.stream()
                .collect(Collectors.toMap(CandidatModel::getId, Function.identity()));

    }

    private Map<Long, SujetModel> fetchSujetsAsMap(List<Long> sujetsIds) {
         List<SujetModel> sujets = sujetRepo.findAllById(sujetsIds);
         if(sujets.size() != sujetsIds.size()){
             Set<Long> foundIds = sujets.stream()
                     .map(SujetModel::getId)
                     .collect(Collectors.toSet());
             List<Long> missingsIds = sujetsIds.stream()
                     .filter(id -> !foundIds.contains(id))
                     .toList();
             throw new ResourceNotFoundException("Les sujets aves les Ids: " + missingsIds + " n'existent pas");
         }
         return sujets.stream().collect(Collectors.toMap(SujetModel::getId, Function.identity()));
    }

}
