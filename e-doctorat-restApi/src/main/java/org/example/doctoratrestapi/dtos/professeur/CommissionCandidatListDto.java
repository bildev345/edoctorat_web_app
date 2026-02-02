package org.example.doctoratrestapi.dtos.professeur;



public record CommissionCandidatListDto(
        Long candidatId,
        String cne,
        String nom,
        String prenom,
        Float noteDossier,
        Integer noteEntretien,
        String decision,
        Boolean valider
) {}
