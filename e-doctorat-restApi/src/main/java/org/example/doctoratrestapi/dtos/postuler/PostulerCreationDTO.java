package org.example.doctoratrestapi.dtos.postuler;

import lombok.Data;

@Data
public class PostulerCreationDTO {
    private Long candidatId;
    private Long sujetId;
    private String pathFile;
}
