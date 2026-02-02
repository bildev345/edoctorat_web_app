package org.example.doctoratrestapi.scolarite;

import org.example.doctoratrestapi.api.ApiResponse;
import org.example.doctoratrestapi.dtos.inscription.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/scolarite")
@PreAuthorize("hasAuthority('ROLE_SCOLARITE')")
public class ScolariteController {

    private final ScolariteServiceFacade facade;

    public ScolariteController(ScolariteServiceFacade facade) {
        this.facade = facade;
    }

    @GetMapping("/inscriptions")
    public ResponseEntity<ApiResponse<List<ScolariteInscriptionListDto>>> getAll() {
        var data = facade.getAllInscriptions();
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @PostMapping("/inscriptions")
    public ResponseEntity<ApiResponse<Void>> create(@RequestBody ScolariteInscriptionCreateDto dto) {
        facade.createInscription(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Inscription ajoutée", null, Instant.now()));
    }

    @PutMapping("/inscriptions/{inscriptionId}")
    public ResponseEntity<ApiResponse<Void>> update(
            @PathVariable Long inscriptionId,
            @RequestBody ScolariteInscriptionUpdateDto dto
    ) {
        facade.updateInscription(inscriptionId, dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Inscription mise à jour", null, Instant.now()));
    }

    @DeleteMapping("/inscriptions/{inscriptionId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long inscriptionId) {
        facade.deleteInscription(inscriptionId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Inscription supprimée", null, Instant.now()));
    }

    // LOOKUPS
    @GetMapping("/candidats")
    public ResponseEntity<ApiResponse<List<ScolariteCandidatLookupDto>>> candidatsLookup() {
        var data = facade.getCandidatsLookup();
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @GetMapping("/sujets")
    public ResponseEntity<ApiResponse<List<ScolariteSujetLookupDto>>> sujetsLookup() {
        var data = facade.getSujetsLookup();
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }
}
