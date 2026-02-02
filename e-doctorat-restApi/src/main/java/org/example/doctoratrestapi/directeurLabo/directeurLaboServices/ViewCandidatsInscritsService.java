package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.repositories.InscriptionRepository;
import org.example.doctoratrestapi.mappers.inscription.InscriptionMapper;
import org.example.doctoratrestapi.models.InscriptionModel;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ViewCandidatsInscritsService {

    private final ProfesseurRepository professeurRepo;
    private final InscriptionRepository inscriptionRepo;
    private final InscriptionMapper inscriptionMapper;

    public Page<CandidatInscriptionDto> selectCandidatsInscritsByLabo(Pageable pageable) {

        long userId = SecurityUtils.currentUserId();

        ProfesseurModel professeur = professeurRepo.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable"));

        long laboId = professeur.getLaboratoire().getId();

        return inscriptionRepo
                .getInscriptionsByLaboId(laboId, pageable)
                .map(inscriptionMapper::toDto);
    }
}

