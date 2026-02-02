package org.example.doctoratrestapi.directeurCed.services;

import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.ced.InscriptionCedDto; // Ghadi n-creyewh
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.ced.CedMapper;
import org.example.doctoratrestapi.models.*;
import org.example.doctoratrestapi.repositories.InscriptionRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CedInscriptionsService {

    private final CedRepository cedRepository;
    private final InscriptionRepository inscriptionRepository;
    private final CedMapper cedMapper;

    public CedInscriptionsService(CedRepository cedRepository,
                                  InscriptionRepository inscriptionRepository,
                                  CedMapper cedMapper) {
        this.cedRepository = cedRepository;
        this.inscriptionRepository = inscriptionRepository;
        this.cedMapper = cedMapper;
    }

    public List<InscriptionCedDto> getInscriptionsByCed() {
        Long userId = SecurityUtils.currentUserId();

        CedModel ced = cedRepository.findByDirecteurUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("CED non trouvé"));

        List<Long> formationIds = ced.getFormations().stream()
                .map(FormationDoctoraleModel::getId)
                .collect(Collectors.toList());

        if (formationIds.isEmpty()) return Collections.emptyList();

        // Njibo ghi l-inscriptions dyal had l-formations
        List<InscriptionModel> inscriptions = inscriptionRepository.findAll().stream()
                .filter(i -> i.getDateDeposerDossier() != null) // Hada howa l-filter dyal SQL
                .filter(i -> i.getSujet().getFormation().getCed().getId().equals(ced.getId()))
                .collect(Collectors.toList());

        return inscriptions.stream()
                .map(cedMapper::toInscriptionCedDto)
                .collect(Collectors.toList());
    }
}