package org.example.doctoratrestapi.dtos.inscription;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor

// DTO de réponse (responseDTO)
public class CandidatInscriptionDto {
    //candidat
    private String cne;
    private String cin;
    private String nomCandidatArabe;
    private String prenomCandidatArabe;
    //inscription
    private LocalDate dateDiposerDossier;
    private String remarque;
    private Boolean valider;
    //sujet
    private String titre;
    private String description;
}
