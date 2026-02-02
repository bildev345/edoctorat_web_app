package org.example.doctoratrestapi.candidat;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.NotificationDto;
import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.dtos.common.SelectOptionDto;
import org.example.doctoratrestapi.dtos.diplome.DiplomeDto;
import org.example.doctoratrestapi.dtos.postuler.CandidatureDtoResponse;
import org.example.doctoratrestapi.dtos.postuler.PostulerDto;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoResponse;
import org.example.doctoratrestapi.mappers.candidat.CandidatMapper;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.DiplomeModel;
import org.example.doctoratrestapi.models.PaysModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/candidats")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CandidatController {

    private final CandidatServiceFacade candidatFacade;
private final CandidatMapper candidatMapper;
    // --- FILTRES CASCADE (CED -> LABO -> FORMATION) ---


    @GetMapping("/laboratoires")
    public ResponseEntity<List<SelectOptionDto>> getLaboratoires(@RequestParam(required = false) Long cedId) {
        return ResponseEntity.ok(candidatFacade.getLaboratoires(cedId));
    }

    @GetMapping("/formations")
    public ResponseEntity<List<SelectOptionDto>> getFormations(@RequestParam(required = false) Long cedId) {
        return ResponseEntity.ok(candidatFacade.getFormations(cedId));
    }
    // Dans CandidatController.java

    @GetMapping("/ceds")
    public ResponseEntity<List<SelectOptionDto>> getAllCeds() {
        return ResponseEntity.ok(candidatFacade.getAllCeds());
    }

    @GetMapping("/sujets")
    public ResponseEntity<List<SujetDtoResponse>> searchSujets(
            @RequestParam(required = false) Long cedId,
            @RequestParam(required = false) Long laboratoireId,
            @RequestParam(required = false) Long formationId) {
        return ResponseEntity.ok(candidatFacade.searchSujets(cedId, laboratoireId, formationId));
    }

    // --- RESTE DES ENDPOINTS (INCHANGÉS) ---
    @GetMapping("/{id}")
    public ResponseEntity<CandidatModel> getCandidat(@PathVariable Long id) {
        return ResponseEntity.ok(candidatFacade.getCandidatById(id));
    }


    @PostMapping("/{id}/diplomes")
    public ResponseEntity<DiplomeModel> addDiplome(@PathVariable Long id, @RequestBody DiplomeDto dto) {
        return new ResponseEntity<>(candidatFacade.addDiplome(id, dto), HttpStatus.CREATED);
    }

    @PostMapping("/{id}/postuler")
    public ResponseEntity<?> postuler(@PathVariable Long id, @RequestBody PostulerDto dto) {
        return new ResponseEntity<>(candidatFacade.postulerAuSujet(id, dto), HttpStatus.CREATED);
    }

    @GetMapping("/pays")
    public ResponseEntity<List<PaysModel>> getAllPays() {
        return ResponseEntity.ok(candidatFacade.getAllPays());
    }
    @GetMapping("/{id}/candidatures")
    public ResponseEntity<List<CandidatureDtoResponse>> getMyCandidatures(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(candidatFacade.getCandidatures(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/{id}/candidatures/{sujetId}")
    public ResponseEntity<?> removeCandidature(@PathVariable Long id, @PathVariable Long sujetId) {
        try {
            candidatFacade.removeCandidature(id, sujetId);
            return ResponseEntity.ok("Candidature retirée avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur lors de la suppression");
        }
    };
    @GetMapping("/{id}/diplomes")
    public ResponseEntity<List<DiplomeModel>> getDiplomes(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(candidatFacade.getDiplomes(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(Principal principal) {
        // getCandidatByEmail doit retourner null si non trouvé, pas lancer d'exception
        CandidatModel candidat = candidatFacade.getCandidatByEmail(principal.getName());
        if (candidat == null) {
            return ResponseEntity.ok().body(null);
        }
        return ResponseEntity.ok(candidatMapper.toDto(candidat));
    }
    @PostMapping("/perso")
    public ResponseEntity<CandidatModel> saveInfos(@RequestBody CandidatDto dto, Principal principal) {
        // Utilise l'email du token pour l'enregistrement
        CandidatModel saved = candidatFacade.saveCandidatInfo(dto, principal.getName());
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/me/diplomes")
    public ResponseEntity<List<DiplomeModel>> getMyDiplomes(Principal principal) {
        try {
            // 1. Récupère le candidat par l'email contenu dans le JWT
            CandidatModel candidat = candidatFacade.getCandidatByEmail(principal.getName());
            // 2. Retourne ses diplômes
            return ResponseEntity.ok(candidatFacade.getDiplomes(candidat.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/me", consumes = {"multipart/form-data"})
    public ResponseEntity<CandidatDto> updateProfile(
            @RequestPart("candidat") CandidatDto dto,
            @RequestPart(value = "photo", required = false) MultipartFile photo,
            Principal principal) {

        CandidatModel updated = candidatFacade.updateCandidatInfo(dto, photo, principal.getName());
        return ResponseEntity.ok(candidatMapper.toDto(updated));
    }
    // --- Mes candidatures + état de verrouillage ---
    @GetMapping("/me/candidatures")
    public ResponseEntity<?> getMyCandidaturesMe(Principal principal) {
        try {
            CandidatModel candidat = candidatFacade.getCandidatByEmail(principal.getName());
            if (candidat == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidat introuvable");
            }

            // réponse enrichie: candidatures + dossierValide
            return ResponseEntity.ok(new MesCandidaturesResponse(
                    candidat.isDossierValide(),
                    candidatFacade.getCandidatures(candidat.getId())
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur serveur");
        }
    }

    // --- Valider définitivement le dossier ---
    @PutMapping("/me/valider-dossier")
    public ResponseEntity<?> validerMonDossier(Principal principal) {
        try {
            CandidatModel candidat = candidatFacade.getCandidatByEmail(principal.getName());
            if (candidat == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidat introuvable");
            }

            if (candidat.isDossierValide()) {
                return ResponseEntity.badRequest().body("Le dossier est déjà validé.");
            }

            candidatFacade.validerDossier(candidat.getId());
            return ResponseEntity.ok("Dossier validé avec succès.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur serveur");
        }
    }

    // Petite classe de réponse (évite de créer un nouveau fichier DTO)
    static class MesCandidaturesResponse {
        public boolean dossierValide;
        public List<CandidatureDtoResponse> candidatures;

        public MesCandidaturesResponse(boolean dossierValide, List<CandidatureDtoResponse> candidatures) {
            this.dossierValide = dossierValide;
            this.candidatures = candidatures;
        }
    }
    @GetMapping("/me/notifications")
    public ResponseEntity<List<NotificationDto>> getMyNotifications(Principal principal) {
        return ResponseEntity.ok(candidatFacade.getMyNotifications(principal.getName()));
    }


}