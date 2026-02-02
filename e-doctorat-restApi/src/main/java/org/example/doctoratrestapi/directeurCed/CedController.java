package org.example.doctoratrestapi.directeurCed;

import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.dtos.ced.*;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/ced")
@PreAuthorize("hasAuthority('ROLE_DIRECTEUR_CED')")
public class CedController {

    @Autowired
    private CedServiceFacade cedServiceFacade;

    @GetMapping("/sujets")
    public List<SujetCedDto> getSujetsByCed() {return cedServiceFacade.getSujetsByCed();}

    @GetMapping("/candidats")
    public List<CandidatCedDto> getCandidatsByCed() {
        return cedServiceFacade.getCandidatsByCed();
    }

    @GetMapping("/commissions")
    public List<CommissionCedDto> getCommissionsByCed() {
        return cedServiceFacade.getCommissionsByCed();
    }

    @GetMapping("/resultats")
    public List<ResultatCedDto> getResultatExaminations() {
        return cedServiceFacade.getResultatExaminations();
    }

    @GetMapping("/inscrits")
    public List<InscriptionCedDto> getInscrits() {return cedServiceFacade.getInscritsByCed();}

    @PostMapping("/inscriptions/export")
    public ResponseEntity<InputStreamResource> exportInscriptions() throws IOException {
        InputStreamResource file = cedServiceFacade.exportInscriptionsExcel();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=rapport_inscriptions.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}
