package org.example.doctoratrestapi.directeurPole;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.calendrier.CalendrierPoleDto;
import org.example.doctoratrestapi.dtos.candidat.CandidatPoleDto;
import org.example.doctoratrestapi.dtos.commission.CommissionPoleDto;
import org.example.doctoratrestapi.dtos.inscription.InscriptionPoleDto;
import org.example.doctoratrestapi.dtos.resultat.ResultatPoleDto;
import org.example.doctoratrestapi.dtos.sujet.SujetPoleDto;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.io.ByteArrayInputStream;
import java.time.Instant;
import org.example.doctoratrestapi.api.ApiResponse;

@RestController
@RequestMapping("/api/directeurPole")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_DIRECTEUR_POLE')")
public class DirecteurPoleController {

    private final DirecteurPoleServiceFacade facade;

    @GetMapping("/sujets")
    public Page<SujetPoleDto> sujets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return facade.getSujetsPole(PageRequest.of(page, size));
    }

    @PutMapping("/sujets/publier")
    public ResponseEntity<ApiResponse<Void>> valider() {
        facade.publierSujets();
        return ResponseEntity.ok(
            new ApiResponse<>(
                true,
                "Les sujets sont publiés avec succés",
                null,
                Instant.now()
            )
        );
    }

    @GetMapping("/calendrier")
    public List<CalendrierPoleDto> getCalendrier() {
        return facade.getCalendrier();
    }

    @PutMapping("/calendrier/{id}")
    public ResponseEntity<ApiResponse<Void>> updateCalendrier(
            @PathVariable Long id,
            @RequestBody CalendrierPoleDto dto // Ensure DTO has dateDebut and dateFin
    ) {
        facade.updateCalendrier(id, dto.dateDebut(), dto.dateFin());
        return ResponseEntity.ok(
            new ApiResponse<>(
                true,
                "Le calendrier est mis à jour avec succès",
                null,
                Instant.now()
            )
        );
    }

    @PutMapping("/resultats/publier/{decision}")
    public void publierDecision(@PathVariable String decision) {
        facade.publierDecision(decision);
    }

    @GetMapping("/resultats/{decision}")
    public Page<ResultatPoleDto> getResultats(
            @PathVariable String decision,
            Pageable pageable
    ) {
        return facade.getResultats(decision, pageable);
    }
    @GetMapping("/candidats")
    public Page<CandidatPoleDto> getCandidats(
            Pageable pageable
    ){
        return facade.getCandidats(pageable);
    }
    @GetMapping("/commissions")
    public Page<CommissionPoleDto> getCommissions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return facade.getCommissions(PageRequest.of(page, size));
    }

    @GetMapping("/inscriptions")
    public Page<InscriptionPoleDto> getInscriptions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return facade.getInscriptions(PageRequest.of(page, size));
    }

    @GetMapping("/inscriptions/rapport")
    public ResponseEntity<byte[]> downloadRapport() {
        byte[] content = facade.getRapportInscription();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Rapport_Inscriptions_Pole.csv\"")
                .header(HttpHeaders.CONTENT_TYPE, "text/csv; charset=UTF-8")
                .body(content);
    }
    @GetMapping("/resultats/download/{decision}")
    public ResponseEntity<InputStreamResource> downloadResultatsPdf(
            @PathVariable String decision
    ) {
        byte[] pdfBytes = facade.generateResultatsPdf(decision);
        
        ByteArrayInputStream bis = new ByteArrayInputStream(pdfBytes);
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=Resultats_" + decision + ".pdf");
        
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}


