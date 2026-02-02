package org.example.doctoratrestapi.dtos.postuler;

public record CandidatPostulesDto(
        long candidatId,
        String candidatNom,
        String candidatCne,
        String sujetTitre,
        String directeurNom,
        String coDirecteurNom,
        String formationDoctoraleTitre
) {
}
