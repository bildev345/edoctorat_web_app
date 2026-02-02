package org.example.doctoratrestapi.dtos.candidat;

public record CandidatPoleDto(
        String sujetTitre,
        String directeur,
        String coDirecteur,
        String cne,
        String nom,
        String prenom,
        String laboratoire,
        String formationDoctorale
) {}

