package org.example.doctoratrestapi.dtos.sujet;

public record SujetLaboDto(
        Long sujetId,
        String titre,
        String directeur,
        String coDirecteur,
        String titreFormationDoctoral
) { }
