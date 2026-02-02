package org.example.doctoratrestapi.professeur;

import org.example.doctoratrestapi.api.ApiResponse;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.dtos.examination.ExaminationCreationDTO;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionDto;
import org.example.doctoratrestapi.dtos.professeur.*;
import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoCreation;
import org.example.doctoratrestapi.models.enums.DecisionEnum;
import org.example.doctoratrestapi.repositories.FormationDoctoraleRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/prof")
@PreAuthorize("hasAuthority('ROLE_PROFESSOR')")
public class ProfesseurController {

    private final ProfesseurServiceFacade professeurServiceFacade;
    private final FormationDoctoraleRepository formationDoctoraleRepository;
    private final ProfesseurRepository professeurRepository;

    public ProfesseurController(
            ProfesseurServiceFacade professeurServiceFacade,
            FormationDoctoraleRepository formationDoctoraleRepository,
            ProfesseurRepository professeurRepository
    ) {
        this.professeurServiceFacade = professeurServiceFacade;
        this.formationDoctoraleRepository = formationDoctoraleRepository;
        this.professeurRepository = professeurRepository;
    }

    private static String userLabel(Object user, Long fallbackId) {
        if (user == null) return "Prof #" + fallbackId;

        String nom = invokeStringGetter(user, "getNom");
        String prenom = invokeStringGetter(user, "getPrenom");

        // si existe nom/prenom -> afficher "Nom Prenom"
        String full = ((nom != null ? nom : "") + " " + (prenom != null ? prenom : "")).trim();
        if (!full.isBlank()) return full;

        // sinon fallback username
        String username = invokeStringGetter(user, "getUsername");
        if (username != null && !username.isBlank()) return username;

        // sinon fallback email
        String email = invokeStringGetter(user, "getEmail");
        if (email != null && !email.isBlank()) return email;

        return "Prof #" + fallbackId;
    }

    private static String invokeStringGetter(Object target, String methodName) {
        try {
            Method m = target.getClass().getMethod(methodName);
            Object val = m.invoke(target);
            return (val != null) ? val.toString() : null;
        } catch (Exception ignored) {
            return null; // ✅ méthode n'existe pas -> on ignore
        }
    }

    // 1) Candidats
    @GetMapping("/candidats")
    public ResponseEntity<ApiResponse<List<CandidatProfListDto>>> getCandidatsByProfesseur() {
        var data = professeurServiceFacade.selectCandidatsByProfesseur();
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @GetMapping("/candidats/{id}")
    public ResponseEntity<ApiResponse<CandidatProfDetailDto>> getCandidatById(@PathVariable Long id) {
        var data = professeurServiceFacade.getCandidatById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    // 2) Sujets
    @PostMapping("/sujets")
    public ResponseEntity<ApiResponse<SujetDTO>> addSujet(@RequestBody SujetDtoCreation dto) {
        var data = professeurServiceFacade.addSujet(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Sujet ajouté avec succès", data, Instant.now()));
    }

    @GetMapping("/sujets")
    public ResponseEntity<ApiResponse<List<SujetDTO>>> getSujetsByProfesseur() {
        var data = professeurServiceFacade.getSujetsByProfesseur();
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @GetMapping("/sujets/{sujetId}")
    public ResponseEntity<ApiResponse<SujetDTO>> getSujetById(@PathVariable Long sujetId) {
        var data = professeurServiceFacade.getSujetById(sujetId);
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @PutMapping("/sujets/{sujetId}")
    public ResponseEntity<ApiResponse<SujetDTO>> updateSujet(
            @PathVariable Long sujetId,
            @RequestBody SujetDtoCreation dto
    ) {
        var data = professeurServiceFacade.updateSujet(sujetId, dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Sujet mis à jour", data, Instant.now()));
    }

    @DeleteMapping("/sujets/{sujetId}")
    public ResponseEntity<ApiResponse<Void>> deleteSujet(@PathVariable Long sujetId) {
        professeurServiceFacade.deleteSujet(sujetId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Sujet supprimé", null, Instant.now()));
    }

    // 3) Commissions
    @GetMapping("/commissions")
    public ResponseEntity<ApiResponse<List<CommissionDTO>>> getCommissionsByProfesseur() {
        var data = professeurServiceFacade.getCommissionsByProfesseur();
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @GetMapping("/examinations/decisions")
    public ResponseEntity<ApiResponse<List<String>>> getDecisions() {
        var list = java.util.Arrays.stream(DecisionEnum.values())
                .map(Enum::name)
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(true, null, list, Instant.now()));
    }

    // 4) Examinations
    @GetMapping("/commissions/{commissionId}/sujets/{sujetId}/candidats/{candidatId}/examination")
    public ResponseEntity<ApiResponse<ExaminationDTO>> getExamination(
            @PathVariable Long commissionId,
            @PathVariable Long sujetId,
            @PathVariable Long candidatId
    ) {
        var data = professeurServiceFacade.getExamination(commissionId, sujetId, candidatId);
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @PostMapping("/commissions/{commissionId}/sujets/{sujetId}/candidats/{candidatId}/examination")
    public ResponseEntity<ApiResponse<ExaminationDTO>> createExamination(
            @PathVariable Long commissionId,
            @PathVariable Long sujetId,
            @PathVariable Long candidatId,
            @RequestBody ExaminationCreationDTO dto
    ) {
        var data = professeurServiceFacade.createExamination(commissionId, sujetId, candidatId, dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Examination ajoutée", data, Instant.now()));
    }

    @PutMapping("/commissions/{commissionId}/sujets/{sujetId}/candidats/{candidatId}/examination")
    public ResponseEntity<ApiResponse<ExaminationDTO>> updateExamination(
            @PathVariable Long commissionId,
            @PathVariable Long sujetId,
            @PathVariable Long candidatId,
            @RequestBody ExaminationCreationDTO dto
    ) {
        var data = professeurServiceFacade.updateExamination(commissionId, sujetId, candidatId, dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Examination modifiée", data, Instant.now()));
    }

    // 5) Inscriptions
    @GetMapping("/inscriptions/sujet/{sujetId}")
    public ResponseEntity<ApiResponse<List<CandidatInscriptionDto>>> getInscriptionBySujet(@PathVariable Long sujetId) {
        var data = professeurServiceFacade.getInscriptionBySujet(sujetId);
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @GetMapping("/inscriptions")
    public ResponseEntity<ApiResponse<List<CandidatInscriptionDto>>> getAllInscriptions() {
        var data = professeurServiceFacade.getAllInscriptions();
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    @GetMapping("/inscriptions/{id}")
    public ResponseEntity<ApiResponse<CandidatInscriptionDto>> getInscriptionById(@PathVariable Long id) {
        var data = professeurServiceFacade.getInscriptionById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    // 6) Sujets d'une commission
    @GetMapping("/commissions/{commissionId}/sujets")
    public ResponseEntity<ApiResponse<List<SujetDTO>>> getSujetsByCommission(@PathVariable Long commissionId) {
        var data = professeurServiceFacade.getSujetsByCommission(commissionId);
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    // 7) Candidats d'un sujet dans une commission
    @GetMapping("/commissions/{commissionId}/sujets/{sujetId}/candidats")
    public ResponseEntity<ApiResponse<List<CommissionCandidatListDto>>> getCandidatsByCommissionSujet(
            @PathVariable Long commissionId,
            @PathVariable Long sujetId
    ) {
        var data = professeurServiceFacade.getCandidatsByCommissionSujet(commissionId, sujetId);
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    // 8) PV PDF
    @GetMapping("/commissions/{commissionId}/sujets/{sujetId}/pv.pdf")
    public ResponseEntity<byte[]> getPvPdf(@PathVariable Long commissionId, @PathVariable Long sujetId) {

        byte[] pdf = professeurServiceFacade.generatePvPdf(commissionId, sujetId);
        String filename = "pv_commission_" + commissionId + "_sujet_" + sujetId + ".pdf";

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .body(pdf);
    }

    // 9) Résultats
    @GetMapping("/resultats")
    public ResponseEntity<ApiResponse<List<ResultatProfDto>>> getResultats() {
        var data = professeurServiceFacade.getResultats();
        return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
    }

    //  Options: Formations (dropdown) -> TITRE
    @GetMapping("/options/formations")
    public ResponseEntity<ApiResponse<List<FormationOptionDto>>> getFormations() {
        var list = formationDoctoraleRepository.findAll().stream()
                .map(f -> new FormationOptionDto(f.getId(), f.getTitre()))
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(true, null, list, Instant.now()));
    }

    // ✅ Options: Co-directeurs (dropdown) -> "Nom Prenom" si possible sinon username/email
    @GetMapping("/options/co-directeurs")
    public ResponseEntity<ApiResponse<List<ProfOptionDto>>> getCoDirecteurs() {

        var list = professeurRepository.findAll().stream()
                .map(p -> new ProfOptionDto(
                        p.getId(),
                        userLabel(p.getUser(), p.getId())
                ))
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(true, null, list, Instant.now()));
    }
}
