package org.example.doctoratrestapi.candidat.candidatServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.candidat.CandidatRepository;
import org.example.doctoratrestapi.repositories.PostulerRepository;
import org.example.doctoratrestapi.dtos.postuler.PostulerDto;
import org.example.doctoratrestapi.mappers.postuler.PostulerMapper;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.PostulerModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CandidatPostulerService {

    private final PostulerRepository postulerRepository;
    private final CandidatRepository candidatRepository;
    private final SujetRepository sujetRepository; // Nécessaire pour récupérer le sujet
    private final PostulerMapper postulerMapper;

    @Transactional
    public PostulerModel postulerAuSujet(Long candidatId, PostulerDto dto) {

        CandidatModel candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new RuntimeException("Candidat introuvable"));

        SujetModel sujet = sujetRepository.findById(dto.getSujetId())
                .orElseThrow(() -> new RuntimeException("Sujet introuvable"));

        if (postulerRepository.existsByCandidatModelAndSujetModel(candidat, sujet)) {
            throw new RuntimeException("déjà postulé à ce sujet.");
        }


        PostulerModel postuler = new PostulerModel();
        postuler.setCandidatModel(candidat);
        postuler.setSujetModel(sujet);
        postuler.setPathFile(dto.getPathFile());

        return postulerRepository.save(postuler);
    }

}