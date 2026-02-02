package org.example.doctoratrestapi.directeurCed.services;

import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.ced.SujetCedDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.ced.CedMapper;
import org.example.doctoratrestapi.mappers.sujet.SujetMapper;
import org.example.doctoratrestapi.models.*;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CedSujetsService {

    private final CedRepository cedRepository;
    private final SujetRepository sujetRepository;
    private final CedMapper cedMapper;

    public CedSujetsService(CedRepository cedRepository,
                            SujetRepository sujetRepository,
                            CedMapper cedMapper) {
        this.cedRepository = cedRepository;
        this.sujetRepository = sujetRepository;
        this.cedMapper = cedMapper;
    }

    public List<SujetCedDto> getSujetsByCed() {
        // 1. Njibo Directeur li connecté
        Long userId = SecurityUtils.currentUserId();

        // 2. Njibo CED
        CedModel ced = cedRepository.findByDirecteurUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Aucun CED trouvé pour ce directeur"));

        // 3. Njibo Formations dyal CED
        List<FormationDoctoraleModel> formationsCed = ced.getFormations();
        if (formationsCed == null || formationsCed.isEmpty()) {
            return Collections.emptyList();
        }

        // 4. Njibo IDs dyal formations
        List<Long> cedFormationIds = formationsCed.stream()
                .map(FormationDoctoraleModel::getId)
                .collect(Collectors.toList());

        // 5. Njibo Sujets li tab3in l had les formations
        List<SujetModel> sujetsCed = sujetRepository.findAll().stream()
                .filter(s -> s.getFormation() != null)
                .filter(s -> cedFormationIds.contains(s.getFormation().getId()))
                .collect(Collectors.toList());

        // 6. Transformer en DTO (SujetCedDto) via le CedMapper
        return sujetsCed.stream()
                .map(cedMapper::toSujetCedDto) // Appel de la méthode créée dans l'étape précédente
                .collect(Collectors.toList());
    }
}
