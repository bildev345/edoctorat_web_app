package org.example.doctoratrestapi.dtos.examination;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ExaminationCreationDTO {
    private Long candidatId;
    private Long commissionId;
    private Long sujetId;
    private String decision;
    private float noteDossier;
    private int noteEntretien;
    private boolean valider;
    private boolean publier;

}
