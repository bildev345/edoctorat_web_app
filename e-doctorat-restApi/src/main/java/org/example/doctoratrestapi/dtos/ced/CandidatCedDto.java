package org.example.doctoratrestapi.dtos.ced; // Awla package li khedama bih

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CandidatCedDto {
    private Long id;                // Id dyal candidat
    private String cne;
    private String nomComplet;      // Nom + Prénom
    private String sujetTitre;
    private String directeurNom;    // Nom complet dyal directeur
    private String coDirecteurNom;  // Nom complet dyal co-directeur (ola "-")
    private String formationTitre;
    private String laboratoireNom;
}