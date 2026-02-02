package org.example.doctoratrestapi.dtos.examination;

public record CandidatExamenListDto(
        Long candidatId,
        String cne,
        String nom,
        String prenom,
        Float noteDossier,
        Integer noteEntretien,
        String decision,
        Boolean valider,
        Boolean publier
) {}
