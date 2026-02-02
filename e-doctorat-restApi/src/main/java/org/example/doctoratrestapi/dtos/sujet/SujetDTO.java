package org.example.doctoratrestapi.dtos.sujet;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class SujetDTO {
    private Long sujetId;
    private String titre;
    private String description;
    private boolean publier;

    private Long formationDoctoralId;
    private String titreFormationDoctoral;
    private Long coDirecteurId;
    private String coDirecteurLabel;
}
