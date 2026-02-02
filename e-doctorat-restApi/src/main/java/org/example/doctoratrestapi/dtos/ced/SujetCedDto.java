package org.example.doctoratrestapi.dtos.ced;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SujetCedDto {
    private Long id;
    private String titre;
    private String description;
    private String directeurNomComplet;   // Professeur qui a créé le sujet
    private String coDirecteurNomComplet; // Co-Directeur (peut être null ou "-")
    private String formationTitre;        // Titre de la formation
}