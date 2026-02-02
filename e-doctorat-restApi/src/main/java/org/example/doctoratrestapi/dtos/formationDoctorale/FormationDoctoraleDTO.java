package org.example.doctoratrestapi.dtos.formationDoctorale;


import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class FormationDoctoraleDTO {
    private Long id;
    private String titre;
    private String initiale;
    private String axeDeRecherche;
    private LocalDate dateAccreditation;
    private String cedTitre;
    private String etablissementNom;
    private String pathImage;
}
