package org.example.doctoratrestapi.dtos.professeur;


public record CandidatProfListDto(
        Long candidatId,
        String cne,
        String nom,
        String prenom,
        String titreSujet
) {}