package org.example.doctoratrestapi.dtos.sujet;

public record SujetLaboDtoCreation(
        String titre,
        String description,
        Long directeurId,
        Long coDirecteurId,
        Long formationDoctoraleId
)
{ }
