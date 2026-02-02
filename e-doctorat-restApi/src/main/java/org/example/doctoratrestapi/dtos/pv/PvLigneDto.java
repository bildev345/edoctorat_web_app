package org.example.doctoratrestapi.dtos.pv;

public record PvLigneDto(
        Long candidatId,
        String cne,
        String nom,
        String prenom,
        float noteDossier,
        int noteEntretien,
        String decision
) {}
