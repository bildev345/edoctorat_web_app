package org.example.doctoratrestapi.dtos.professeur;

public record ResultatProfDto(
        Long candidatId,
        String cne,
        String nom,
        String prenom,

        Long sujetId,
        String sujetTitre,

        Long commissionId,

        String decision,
        float noteDossier,
        int noteEntretien
) {}
