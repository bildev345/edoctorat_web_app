package org.example.doctoratrestapi.directeurLabo;

import org.example.doctoratrestapi.api.ApiResponse;
import org.example.doctoratrestapi.dtos.commission.CommissionCreationDto;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.dtos.common.PageResponseDto;
import org.example.doctoratrestapi.dtos.examination.ResultatExaminationDto;
import org.example.doctoratrestapi.dtos.formationDoctorale.FormationDtoLabo;
import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionDto;
import org.example.doctoratrestapi.dtos.notification.NotificationBulkCreationDto;
import org.example.doctoratrestapi.dtos.postuler.CandidatPostulesDto;
import org.example.doctoratrestapi.dtos.professeur.ProfesseurLaboDto;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDto;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDtoCreation;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;



import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/directeurLabo")
@PreAuthorize("hasAuthority('ROLE_DIRECTEUR_LABO')")
public class DirecteurLaboController {
    private final DirecteurLaboServiceFacade directeurLaboServiceFacade;
    public DirecteurLaboController(DirecteurLaboServiceFacade directeurLaboServiceFacade){
        this.directeurLaboServiceFacade = directeurLaboServiceFacade;
    }
    @GetMapping("professeurs")
    public List<ProfesseurLaboDto> getProfesseurs(){
        return directeurLaboServiceFacade.selectProfs();
    }
    @GetMapping("formations")
    public List<FormationDtoLabo> getFormations(){
        return directeurLaboServiceFacade.selectFormations();
    }
    @GetMapping("candidatsPostules")
    public ResponseEntity<ApiResponse<Page<CandidatPostulesDto>>> getCandidatsByLabo(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
       Page<CandidatPostulesDto> candidats = directeurLaboServiceFacade.getCandidatsByLabo(PageRequest.of(page, size));
       return ResponseEntity.ok(new ApiResponse<>(
               true,
               null,
               candidats,
               Instant.now()
       ));
    }

    @GetMapping("sujets")
    public ResponseEntity<PageResponseDto<SujetLaboDto>> getSujetsByLabo(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        return ResponseEntity.ok(
                directeurLaboServiceFacade.getSujetsByLabo(pageable, name)
        );
    }

    @PostMapping("sujet/add")
    public ResponseEntity<ApiResponse<Void>> addSujet(@RequestBody SujetLaboDtoCreation sujetDto){
        directeurLaboServiceFacade.addSujet(sujetDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "le sujet à été ajouté avec succés",
                        null,
                        Instant.now()
                ));
    }
    @PostMapping("commissions")
    public ResponseEntity<ApiResponse<CommissionDTO>> addCommission(@RequestBody CommissionCreationDto dto){
        CommissionDTO commissionDto = directeurLaboServiceFacade.addCommission(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "La commission à été crée avec succès",
                        commissionDto,
                        Instant.now()
                ));

    }
    @GetMapping("/resultats")
    public ResponseEntity<ApiResponse<Page<ResultatExaminationDto>>> getResultatExaminations(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
     ) {
        Page<ResultatExaminationDto> resultats =
                directeurLaboServiceFacade.getResultatExaminations(PageRequest.of(page, size));

        return ResponseEntity.ok(new ApiResponse<>(
                true,
                null,
                resultats,
                Instant.now()
        ));
    }
    @GetMapping("inscrits")
    public ResponseEntity<ApiResponse<Page<CandidatInscriptionDto>>> getCandidatsInscrits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<CandidatInscriptionDto> result =
                directeurLaboServiceFacade.getCandidatsInscritsByLabo(PageRequest.of(page, size));

        return ResponseEntity.ok(
                new ApiResponse<>(true, null, result, Instant.now())
        );
    }
    @PostMapping("createNotifs")
    public ResponseEntity<ApiResponse<Void>> addNotifications(@RequestBody NotificationBulkCreationDto dto){
        directeurLaboServiceFacade.addNotifications(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Les notifications sont envoyés avec succés",
                        null,
                        Instant.now()
                ));
    }
    @GetMapping("commissions")
    public ResponseEntity<ApiResponse<Page<CommissionDTO>>> getCommissions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<CommissionDTO> result =
                directeurLaboServiceFacade.getCommissionsByLabo(page, size);

        return ResponseEntity.ok(
                new ApiResponse<>(true, null, result, Instant.now())
        );
    }

//    @PutMapping("commissions/{id}")
//    public ResponseEntity<ApiResponse<CommissionDTO>> udpateCommission(@RequestParam long id){
//        return ResponseEntity.ok(new ApiResponse<CommissionDTO>(
//
//        ))
//    }
//    @DeleteMapping("commissions/{id}")
//    public ResponseEntity<ApiResponse<Void>> deleteCommission(@RequestParam long id ){
//        //
//    }

    // à implementer
    //public void telechargerPVGlobal();
    //public void uploaderSujetsCsv();
    @GetMapping("/sujetsLaboList")
    public List<SujetModel> getSujetsByLaboId(){
        return directeurLaboServiceFacade.getSujetsByLabo();
    }

}
