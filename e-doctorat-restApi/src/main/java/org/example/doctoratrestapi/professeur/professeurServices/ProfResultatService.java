package org.example.doctoratrestapi.professeur.professeurServices;

import org.example.doctoratrestapi.dtos.professeur.ResultatProfDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.repositories.ExaminerRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfResultatService {

    private final ExaminerRepository examinerRepository;

    public ProfResultatService(ExaminerRepository examinerRepository) {
        this.examinerRepository = examinerRepository;
    }

    public List<ResultatProfDto> getResultats() {

        Long userId = SecurityUtils.currentUserId();

        var exams = examinerRepository.findResultatsForProf(userId);
        if (exams.isEmpty()) throw new ResourceNotFoundException("Aucun résultat trouvé");

        return exams.stream().map(ex -> new ResultatProfDto(
                ex.getCandidat().getId(),
                ex.getCandidat().getCne(),
                ex.getCandidat().getNomCandidatArabe(),
                ex.getCandidat().getPrenomCandidatArabe(),

                ex.getSujet().getId(),
                ex.getSujet().getTitre(),

                ex.getCommission().getId(),

                ex.getDecision(),
                ex.getNoteDossier(),
                ex.getNoteEntretien()
        )).toList();
    }
}
