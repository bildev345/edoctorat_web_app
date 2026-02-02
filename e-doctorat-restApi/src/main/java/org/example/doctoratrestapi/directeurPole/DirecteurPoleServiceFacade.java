package org.example.doctoratrestapi.directeurPole;

import org.example.doctoratrestapi.dtos.calendrier.CalendrierPoleDto;
import org.example.doctoratrestapi.dtos.candidat.CandidatPoleDto;
import org.example.doctoratrestapi.dtos.commission.CommissionPoleDto;
import org.example.doctoratrestapi.dtos.inscription.InscriptionPoleDto;
import org.example.doctoratrestapi.dtos.resultat.ResultatPoleDto;
import org.example.doctoratrestapi.dtos.sujet.SujetPoleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface DirecteurPoleServiceFacade {

    Page<SujetPoleDto> getSujetsPole(Pageable pageable);

    void publierSujets();

    List<CalendrierPoleDto> getCalendrier();

    void updateCalendrier(Long id, LocalDateTime dateDebut, LocalDateTime dateFin);

    void publierDecision(String decision);

    Page<ResultatPoleDto> getResultats(String decision, Pageable pageable);
    List<Long> getAllCedIds();

    Page<CandidatPoleDto> getCandidats(Pageable pageable);

    Page<CommissionPoleDto> getCommissions(Pageable pageable);

    Page<InscriptionPoleDto> getInscriptions(Pageable pageable);


    byte[] getRapportInscription();
    byte[] generateResultatsPdf(String decision);
}
