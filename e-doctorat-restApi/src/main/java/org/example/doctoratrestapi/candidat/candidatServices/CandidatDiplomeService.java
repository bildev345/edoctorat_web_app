package org.example.doctoratrestapi.candidat.candidatServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.candidat.CandidatRepository;
import org.example.doctoratrestapi.dtos.diplome.DiplomeDto;
import org.example.doctoratrestapi.repositories.DiplomeRepository;
import org.example.doctoratrestapi.mappers.diplome.DiplomeMapper;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.DiplomeModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CandidatDiplomeService {

    private final DiplomeRepository diplomeRepository;
    private final CandidatRepository candidatRepository;
    private final DiplomeMapper diplomeMapper;

//Etape 2 : Ajout d'un diplôme au candidat existant
    @Transactional
    public DiplomeModel addDiplome(Long candidatId, DiplomeDto dto) {
        CandidatModel candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new RuntimeException("Candidat introuvable "));
        DiplomeModel diplome = diplomeMapper.toEntity(dto);
        diplome.setCandidat(candidat);
        return diplomeRepository.save(diplome);
    }
}