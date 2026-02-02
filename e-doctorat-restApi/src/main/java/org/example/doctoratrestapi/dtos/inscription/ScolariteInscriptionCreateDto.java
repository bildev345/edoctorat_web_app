package org.example.doctoratrestapi.dtos.inscription;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ScolariteInscriptionCreateDto {
    private LocalDate dateDeposerDossier;
    private String remarque;

    // on garde les ids côté API mais on ne les affiche pas au user (on les choisit via dropdown)
    private Long candidatId;
    private Long sujetId;
}
