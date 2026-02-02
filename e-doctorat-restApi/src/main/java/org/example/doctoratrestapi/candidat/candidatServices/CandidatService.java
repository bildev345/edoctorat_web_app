package org.example.doctoratrestapi.candidat.candidatServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.candidat.CandidatRepository;
import org.example.doctoratrestapi.repositories.PaysRepository;
import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.mappers.candidat.CandidatMapper;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.PaysModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CandidatService {

    private final CandidatRepository candidatRepository;
    private final PaysRepository paysRepository;
    private final CandidatMapper candidatMapper;

//  Etape 1 : Création du profil candidat
    @Transactional
    public CandidatModel saveCandidatInfo(CandidatDto dto) {
        CandidatModel candidat = candidatMapper.toCandidatEntity(dto);
        if (dto.getPaysId() != null) {
            PaysModel pays = paysRepository.findById(dto.getPaysId())
                    .orElseThrow(() -> new RuntimeException("Pays introuvable"));
            candidat.setPays(pays);
        }
        return candidatRepository.save(candidat);
    }
}