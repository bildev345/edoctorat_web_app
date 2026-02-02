package org.example.doctoratrestapi.directeurCed;

import org.example.doctoratrestapi.directeurCed.services.*;
import org.example.doctoratrestapi.dtos.ced.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@Service
public class CedServiceFacadeImp implements CedServiceFacade {

    private final CedSujetsService cedSujetsService;
    private final CedCandidatsService cedCandidatsService;
    private final CedCommissionsService cedCommissionsService;
    private final CedResultatsService cedResultatsService;
    // 1. Zid l-attribut l-khass b service dyal les inscriptions
    private final CedInscriptionsService cedInscriptionsService;
    private final CedExportService cedExportService;

    // 2. Mettre à jour l-Constructor bach y-injecti l-service l-jdid
    public CedServiceFacadeImp(CedSujetsService cedSujetsService,
                               CedCandidatsService cedCandidatsService,
                               CedCommissionsService cedCommissionsService,
                               CedResultatsService cedResultatsService,
                               CedInscriptionsService cedInscriptionsService,
                               CedExportService cedExportService) {
        this.cedSujetsService = cedSujetsService;
        this.cedCandidatsService = cedCandidatsService;
        this.cedCommissionsService = cedCommissionsService;
        this.cedResultatsService = cedResultatsService;
        this.cedInscriptionsService = cedInscriptionsService;
        this.cedExportService = cedExportService;
    }

    @Override
    public List<SujetCedDto> getSujetsByCed() {
        return cedSujetsService.getSujetsByCed();
    }

    @Override
    public List<CandidatCedDto> getCandidatsByCed() {
        return cedCandidatsService.getCandidatsByCed();
    }

    @Override
    public List<CommissionCedDto> getCommissionsByCed() {
        return cedCommissionsService.getCommissionsByCed();
    }

    @Override
    public List<ResultatCedDto> getResultatExaminations() {
        return cedResultatsService.getResultatExaminations();
    }

    @Override
    public List<InscriptionCedDto> getInscritsByCed() {
        // Daba had l-appel ghadi y-khdem hit l-variable wellat connue
        return cedInscriptionsService.getInscriptionsByCed();
    }

    @Override
    public InputStreamResource exportInscriptionsExcel() throws IOException {
        List<InscriptionCedDto> inscrits = cedInscriptionsService.getInscriptionsByCed();
        ByteArrayInputStream in = cedExportService.exportInscriptionsToExcel(inscrits);
        return new InputStreamResource(in);
    }

}