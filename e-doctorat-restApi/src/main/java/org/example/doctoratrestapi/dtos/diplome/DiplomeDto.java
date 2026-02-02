package org.example.doctoratrestapi.dtos.diplome;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doctoratrestapi.dtos.annexe.AnnexeDto;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiplomeDto {
    private String intitule;
    private String type;
    private LocalDateTime dateCommission;
    private String mention;
    private String pays;
    private String etablissement;
    private String specialite;
    private String ville;
    private String province;
    private Double moyenneGenerale;

    private List<AnnexeDto> annexes;
}