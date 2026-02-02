package org.example.doctoratrestapi.dtos.etablissement;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EtablissementDTO {
    private Long id;
    private String nomEtablissement;
    private int nombreLabos;
}

