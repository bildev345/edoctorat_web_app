package org.example.doctoratrestapi.directeurCed;

import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.dtos.ced.*;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.springframework.core.io.InputStreamResource;

import java.io.IOException;
import java.util.List;

public interface CedServiceFacade {
    List<SujetCedDto> getSujetsByCed();

    List<CandidatCedDto> getCandidatsByCed();

    List<CommissionCedDto> getCommissionsByCed();

    List<ResultatCedDto> getResultatExaminations();

    List<InscriptionCedDto> getInscritsByCed();

    // CedServiceFacade.java
    InputStreamResource exportInscriptionsExcel() throws IOException;


}
