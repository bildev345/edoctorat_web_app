package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.dtos.examination.ResultatExaminationDto;
import org.example.doctoratrestapi.repositories.ExaminerRepository;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.examiner.ExaminerMapper;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ViewExaminationsService {

    private final ExaminerRepository examinerRepository;
    private final ProfesseurRepository professeurRepository;
    private final ExaminerMapper examinerMapper;

    public Page<ResultatExaminationDto> selectExaminationsByLabo(Pageable pageable){
    long userId = SecurityUtils.currentUserId();

    ProfesseurModel professeur = professeurRepository.findByUserId(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable"));

    long laboId = professeur.getLaboratoire().getId();

    return examinerRepository.findExaminationsByLabo(laboId, pageable)
            .map(examinerMapper::toResultatExaminationDto);
}

}

