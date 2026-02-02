package org.example.doctoratrestapi.dtos.diplome;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.example.doctoratrestapi.dtos.annexe.AnnexeCreationDto;

import java.time.LocalDateTime;
import java.util.List;

public record DiplomeCreationDto(
        @NotBlank String intitule,
        @NotBlank String type,
        @NotBlank LocalDateTime dateCommission,
        @NotBlank String mention,
        @NotBlank String pays,
        @NotBlank String etablissement,
        @NotBlank String specialite,
        @NotBlank String ville,
        @NotBlank String province,
        @NotNull Double moyenneGenerale,

        @Size(min = 2, max = 2)
        @Valid
        List<AnnexeCreationDto> annexes

) {
}
