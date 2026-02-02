package org.example.doctoratrestapi.dtos.sujet;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SujetDtoResponse {
    private Long id;
    private String titre;
    private String description;

    // Informations Encadrement
    private String profNom;

    // Informations Structure
    private String labNom;
    private String cedocNom;

    // Informations Formation & Etablissement
    private String formationNom;
    private String etablissementNom; // <--- NOUVEAU CHAMP
}