package org.example.doctoratrestapi.directeurCed.services;

import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.ced.CommissionCedDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.ced.CedMapper;
import org.example.doctoratrestapi.models.*;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CedCommissionsService {

    private final CedRepository cedRepository;
    private final SujetRepository sujetRepository;
    private final CedMapper cedMapper; // 1. Khass ykon final hna

    // 2. Zid CedMapper f l-Constructor
    public CedCommissionsService(CedRepository cedRepository,
                                 SujetRepository sujetRepository,
                                 CedMapper cedMapper) {
        this.cedRepository = cedRepository;
        this.sujetRepository = sujetRepository;
        this.cedMapper = cedMapper;
    }

    public List<CommissionCedDto> getCommissionsByCed() {
        // 1. Njibo l-Directeur li khedam daba
        Long userId = SecurityUtils.currentUserId();
        CedModel ced = cedRepository.findByDirecteurUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("CED non trouvé"));

        // 2. Njibo l-IDs dyal les formations dyal had l-CED
        List<Long> cedFormationIds = ced.getFormations().stream()
                .map(FormationDoctoraleModel::getId)
                .collect(Collectors.toList());

        // 3. Njibo les sujets li tab3in l had l-formations
        List<SujetModel> sujetsCed = sujetRepository.findAll().stream()
                .filter(s -> s.getFormation() != null && cedFormationIds.contains(s.getFormation().getId()))
                .collect(Collectors.toList());

        // 4. Groupi les sujets par Commission
        // Bach kolla commission n-sifto liha ga3 les sujets li ghadi t-examiner
        Map<CommissionModel, List<SujetModel>> commissionSujetsMap = new HashMap<>();

        for (SujetModel sujet : sujetsCed) {
            if (sujet.getExaminations() != null) {
                for (ExaminerModel examiner : sujet.getExaminations()) {
                    if (examiner.getCommission() != null) {
                        commissionSujetsMap.computeIfAbsent(examiner.getCommission(), k -> new ArrayList<>()).add(sujet);
                    }
                }
            }
        }

        // 5. Mapping l DTO jdid
        return commissionSujetsMap.entrySet().stream()
                .map(entry -> cedMapper.toCommissionCedDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}