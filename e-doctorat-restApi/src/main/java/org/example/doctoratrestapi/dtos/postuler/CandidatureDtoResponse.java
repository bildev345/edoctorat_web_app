package org.example.doctoratrestapi.dtos.postuler;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CandidatureDtoResponse {
    private Long id;          // ID de la candidature (postuler)
    private String titre;     // Titre du sujet
    private String description;
    private String prof;      // Nom du professeur
    private String lab;       // Nom du labo
    private String cedoc;     // Nom du CEDOC
    private String etat;      // État (EN_ATTENTE, etc.)
}