package org.example.doctoratrestapi.dtos.annexe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnnexeDto {
    private String typeAnnexe;
    private String titre;
    private String pathFile;
}