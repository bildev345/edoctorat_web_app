package org.example.doctoratrestapi.dtos.candidat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidatDto {
    private String cne;
    private String cin;
    private String nom;
    private String prenom;
    private String adresse;
    private String villeDeNaissance;

    private String nomArabe;
    private String prenomArabe;
    private String adresseArabe;
    private String villeDeNaissanceArabe;

    private String sexe;
    private String ville;
    private LocalDate dateDeNaissance;
    private String typeDeHandicape;
    private String academie;
    private String telCandidat;
    private String situationFamiliale;
    private boolean fonctionaire;

    private Long paysId;

    private String pathCv;    // Important pour le fichier
    private String pathPhoto; // Important pour le fichier
}