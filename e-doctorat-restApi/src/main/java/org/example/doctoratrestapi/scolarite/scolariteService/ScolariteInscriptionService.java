package org.example.doctoratrestapi.scolarite.scolariteService;

import org.example.doctoratrestapi.dtos.inscription.*;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.scolarite.ScolariteInscriptionMapper;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.InscriptionModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.example.doctoratrestapi.scolarite.ScolariteRepository;
import org.example.doctoratrestapi.candidat.CandidatRepository;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ScolariteInscriptionService {

    private final ScolariteRepository scolariteRepository;
    private final CandidatRepository candidatRepository;
    private final SujetRepository sujetRepository;
    private final ScolariteInscriptionMapper mapper;

    public ScolariteInscriptionService(
            ScolariteRepository scolariteRepository,
            CandidatRepository candidatRepository,
            SujetRepository sujetRepository,
            ScolariteInscriptionMapper mapper
    ) {
        this.scolariteRepository = scolariteRepository;
        this.candidatRepository = candidatRepository;
        this.sujetRepository = sujetRepository;
        this.mapper = mapper;
    }

    public List<ScolariteInscriptionListDto> getAllInscriptions() {
        var list = scolariteRepository.findAllWithDetails();
        if (list.isEmpty()) throw new ResourceNotFoundException("Aucune inscription trouvée");
        return list.stream().map(mapper::toListDto).toList();
    }

    public void createInscription(ScolariteInscriptionCreateDto dto) {
        CandidatModel candidat = candidatRepository.findById(dto.getCandidatId())
                .orElseThrow(() -> new ResourceNotFoundException("Candidat introuvable"));

        SujetModel sujet = sujetRepository.findById(dto.getSujetId())
                .orElseThrow(() -> new ResourceNotFoundException("Sujet introuvable"));

        if (scolariteRepository.existsByCandidatIdAndSujetId(dto.getCandidatId(), dto.getSujetId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Inscription déjà existante pour ce candidat et ce sujet");
        }

        InscriptionModel ins = new InscriptionModel();
        ins.setCandidat(candidat);
        ins.setSujet(sujet);
        ins.setDateDeposerDossier(dto.getDateDeposerDossier());
        ins.setRemarque(dto.getRemarque());
        ins.setValider(null); // En attente
        scolariteRepository.save(ins);
    }

    // ✅ UPDATE UNIQUE : date + remarque + valider
    public void updateInscription(Long inscriptionId, ScolariteInscriptionUpdateDto dto) {
        InscriptionModel ins = scolariteRepository.findById(inscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("Inscription introuvable"));

        if (dto.getDateDeposerDossier() != null) ins.setDateDeposerDossier(dto.getDateDeposerDossier());
        if (dto.getRemarque() != null) ins.setRemarque(dto.getRemarque());
        if (dto.getValider() != null) ins.setValider(dto.getValider());

        scolariteRepository.save(ins);
    }

    public void deleteInscription(Long inscriptionId) {
        InscriptionModel ins = scolariteRepository.findById(inscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("Inscription introuvable"));

        scolariteRepository.delete(ins);
    }
}
