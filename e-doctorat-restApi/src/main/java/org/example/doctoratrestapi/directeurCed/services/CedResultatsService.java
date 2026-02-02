package org.example.doctoratrestapi.directeurCed.services;

import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.ced.ResultatCedDto; // 1. Import l-DTO jdid
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.repositories.ExaminerRepository;
import org.example.doctoratrestapi.mappers.ced.CedMapper; // 2. Import l-CedMapper
import org.example.doctoratrestapi.models.*;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CedResultatsService {

    private final CedRepository cedRepository;
    private final ExaminerRepository examinerRepository;
    private final CedMapper cedMapper; // 3. Ghadi n-khdmo b CedMapper

    public CedResultatsService(CedRepository cedRepository,
                               ExaminerRepository examinerRepository,
                               CedMapper cedMapper) {
        this.cedRepository = cedRepository;
        this.examinerRepository = examinerRepository;
        this.cedMapper = cedMapper;
    }

    // 4. Beddel l-retour l List<ResultatCedDto>
    public List<ResultatCedDto> getResultatExaminations() {
        // 1. Récupérer l'ID de l'utilisateur connecté (directeur du CED)
        Long userId = SecurityUtils.currentUserId();

        // 2. Récupérer le CED associé au directeur
        CedModel ced = cedRepository.findByDirecteurUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Aucun CED trouvé pour ce directeur"));

        // 3. Récupérer les formations doctorales du CED
        List<FormationDoctoraleModel> formationsCed = ced.getFormations();
        if (formationsCed == null || formationsCed.isEmpty()) {
            return Collections.emptyList();
        }

        // 4. Extraire les IDs des formations
        List<Long> cedFormationIds = formationsCed.stream()
                .map(FormationDoctoraleModel::getId)
                .collect(Collectors.toList());

        // 5. Récupérer les examens liés aux formations du CED
        List<ExaminerModel> examinations = examinerRepository.findExaminationsByFormations(cedFormationIds);

        // 6. Convertir en DTOs spécific l l-CED
        return examinations.stream()
                .map(cedMapper::toResultatCedDto) // 5. Khdem b mapper dyal ResultatCedDto
                .collect(Collectors.toList());
    }
}