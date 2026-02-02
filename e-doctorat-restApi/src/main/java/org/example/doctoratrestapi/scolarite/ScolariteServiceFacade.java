package org.example.doctoratrestapi.scolarite;

import org.example.doctoratrestapi.dtos.inscription.*;

import java.util.List;

public interface ScolariteServiceFacade {

    List<ScolariteInscriptionListDto> getAllInscriptions();
    void createInscription(ScolariteInscriptionCreateDto dto);
    void updateInscription(Long inscriptionId, ScolariteInscriptionUpdateDto dto);
    void deleteInscription(Long inscriptionId);

    List<ScolariteCandidatLookupDto> getCandidatsLookup();
    List<ScolariteSujetLookupDto> getSujetsLookup();
}
