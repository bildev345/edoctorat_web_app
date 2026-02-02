package org.example.doctoratrestapi.scolarite;

import org.example.doctoratrestapi.dtos.inscription.*;
import org.example.doctoratrestapi.repositories.scolarite.ScolariteCandidatLookupRepository;
import org.example.doctoratrestapi.repositories.scolarite.ScolariteSujetLookupRepository;
import org.example.doctoratrestapi.scolarite.scolariteService.ScolariteInscriptionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScolariteServiceFacadeImp implements ScolariteServiceFacade {

    private final ScolariteInscriptionService inscriptionService;
    private final ScolariteCandidatLookupRepository candidatLookupRepo;
    private final ScolariteSujetLookupRepository sujetLookupRepo;

    public ScolariteServiceFacadeImp(
            ScolariteInscriptionService inscriptionService,
            ScolariteCandidatLookupRepository candidatLookupRepo,
            ScolariteSujetLookupRepository sujetLookupRepo
    ) {
        this.inscriptionService = inscriptionService;
        this.candidatLookupRepo = candidatLookupRepo;
        this.sujetLookupRepo = sujetLookupRepo;
    }

    @Override
    public List<ScolariteInscriptionListDto> getAllInscriptions() {
        return inscriptionService.getAllInscriptions();
    }

    @Override
    public void createInscription(ScolariteInscriptionCreateDto dto) {
        inscriptionService.createInscription(dto);
    }

    @Override
    public void updateInscription(Long inscriptionId, ScolariteInscriptionUpdateDto dto) {
        inscriptionService.updateInscription(inscriptionId, dto);
    }

    @Override
    public void deleteInscription(Long inscriptionId) {
        inscriptionService.deleteInscription(inscriptionId);
    }

    @Override
    public List<ScolariteCandidatLookupDto> getCandidatsLookup() {
        return candidatLookupRepo.findAllLookup();
    }

    @Override
    public List<ScolariteSujetLookupDto> getSujetsLookup() {
        return sujetLookupRepo.findAllLookup();
    }
}
