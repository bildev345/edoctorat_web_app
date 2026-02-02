package org.example.doctoratrestapi.dtos.ced;

import org.example.doctoratrestapi.dtos.professeur.ProfesseurDto;

import java.util.List;

public record CedDTO(
        Long id,
        String titre,
        String initiale,
        String description,
        ProfesseurDto directeur,
        List<String> formationsIntitules
) {

}
