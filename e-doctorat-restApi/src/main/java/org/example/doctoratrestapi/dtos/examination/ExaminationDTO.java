package org.example.doctoratrestapi.dtos.examination;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExaminationDTO {
    private Long id;
    private String decision;
    private float noteDossier;
    private int noteEntretien;
    private boolean publier;
    private boolean valider;
    private Long candidatId;
    private Long commissionId;
    private Long sujetId;

}
