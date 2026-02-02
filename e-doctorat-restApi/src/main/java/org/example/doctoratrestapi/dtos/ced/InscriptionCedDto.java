package org.example.doctoratrestapi.dtos.ced;

import lombok.Builder;

@Builder
public record InscriptionCedDto(
        Long id,
        String cne,
        String nomComplet,
        String sujetTitre,
        String formationTitre,
        String dateDepot,
        Boolean estValide,
        String remarque
) {}