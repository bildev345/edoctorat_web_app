package org.example.doctoratrestapi.dtos.inscription;

import lombok.Data;

@Data
public class ScolariteInscriptionValidationDto {
    private Boolean valider;
    private String remarque;
}
