package org.example.doctoratrestapi.dtos.annexe;

import jakarta.validation.constraints.NotBlank;

public record AnnexeCreationDto(
        @NotBlank String typeAnnexe,
        @NotBlank String titre,
        @NotBlank String pathFile
) {
}
