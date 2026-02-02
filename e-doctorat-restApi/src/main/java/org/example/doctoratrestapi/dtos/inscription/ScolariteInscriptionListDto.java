package org.example.doctoratrestapi.dtos.inscription;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ScolariteInscriptionListDto {

    private Long inscriptionId;

    // candidat
    private Long candidatId;
    private String cne;
    private String cin;
    private String nomCandidatArabe;
    private String prenomCandidatArabe;

    // sujet
    private Long sujetId;
    private String sujetTitre;

    // formation
    private Long formationId;
    private String formationTitre;

    // ced
    private Long cedId;
    private String cedTitre;

    // labo
    private Long laboId;
    private String laboTitre;

    // inscription
    private LocalDate dateDeposerDossier;
    private String remarque;
    private Boolean valider;
}
