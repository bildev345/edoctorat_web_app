package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;
import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.models.CommissionModel;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.repositories.CommissionProfesseurRepository;
import org.example.doctoratrestapi.repositories.CommissionRepository;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ViewLaboCommissionsService {

    private final CommissionRepository commissionRepository;
    private final ProfesseurRepository professeurRepository;
    private final CommissionProfesseurRepository commissionProfesseurRepository;
    private final SujetRepository sujetRepository;

    public Page<CommissionDTO> getCommissionsByLabo(int page, int size) {

        long userId = SecurityUtils.currentUserId();

        ProfesseurModel professeur = professeurRepository
                .findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Professeur introuvable"));

        Long laboId = professeur.getLaboratoire().getId();

        Pageable pageable = PageRequest.of(page, size);
        Page<CommissionModel> commissions =
                commissionRepository.findByLaboratoireId(laboId, pageable);

        if (commissions.isEmpty()) {
            return Page.empty(pageable);
        }

        List<Long> commissionIds = commissions
                .getContent()
                .stream()
                .map(CommissionModel::getId)
                .toList();

        /* ===== Membres par commission ===== */
        Map<Long, List<String>> membresMap =
                commissionProfesseurRepository
                        .findMemberNamesByCommissionIds(commissionIds)
                        .stream()
                        .collect(Collectors.groupingBy(
                                row -> (Long) row[0],
                                Collectors.mapping(
                                        row -> (String) row[1],
                                        Collectors.toList()
                                )
                        ));

        /* ===== Sujets du laboratoire (shared) ===== */
        List<String> sujetsDuLabo =
                sujetRepository
                        .findSujetsTitresByLaboratoireIds(List.of(laboId))
                        .stream()
                        .map(row -> (String) row[1])
                        .distinct()
                        .toList();

        /* ===== DTO Mapping ===== */
        List<CommissionDTO> dtos = commissions
                .getContent()
                .stream()
                .map(c -> new CommissionDTO(
                        c.getId(),
                        c.getDateCommission(),
                        c.getLieu(),
                        c.getHeure(),
                        sujetsDuLabo, // same list (by design)
                        membresMap.getOrDefault(c.getId(), List.of())
                ))
                .toList();

        return new PageImpl<>(dtos, pageable, commissions.getTotalElements());
    }
}
