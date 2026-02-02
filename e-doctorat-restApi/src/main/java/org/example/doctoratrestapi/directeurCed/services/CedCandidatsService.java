package org.example.doctoratrestapi.directeurCed.services;

import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.ced.CandidatCedDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.ced.CedMapper;
import org.example.doctoratrestapi.models.*;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CedCandidatsService {

    private final CedRepository cedRepository;
    private final SujetRepository sujetRepository;
    private final CedMapper cedMapper; // Nsta3mlo Mapper jdid

    public CedCandidatsService(CedRepository cedRepository,
                               SujetRepository sujetRepository,
                               CedMapper cedMapper) {
        this.cedRepository = cedRepository;
        this.sujetRepository = sujetRepository;
        this.cedMapper = cedMapper;
    }

    // Return type tbeddel l CandidatCedDto
    public List<CandidatCedDto> getCandidatsByCed() {
        // 1. Njibo Directeur
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

        // 6. Njibo Candidats M3A Sujets dyalhom (L-Partie l-mouhimma)
        List<CandidatCedDto> resultat = new ArrayList<>();

        for (SujetModel sujet : sujetsCed) {
            if (sujet.getPostulations() != null) {
                for (PostulerModel post : sujet.getPostulations()) {
                    CandidatModel candidat = post.getCandidatModel(); // Smya f PostulerModel
                    if (candidat != null) {
                        // Mapper ghadi yjm3 lina kolchi
                        CandidatCedDto dto = cedMapper.toCandidatCedDto(candidat, sujet);
                        resultat.add(dto);
                    }
                }
            }
        }
        return resultat;
    }
}
