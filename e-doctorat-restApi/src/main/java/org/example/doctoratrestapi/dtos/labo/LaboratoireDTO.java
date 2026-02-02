package org.example.doctoratrestapi.dtos.labo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LaboratoireDTO {
    private Long id;
    private String nomLaboratoire;
    private String cedTitre;
    private String etablissementNom;
    private String directeurNom;
}
