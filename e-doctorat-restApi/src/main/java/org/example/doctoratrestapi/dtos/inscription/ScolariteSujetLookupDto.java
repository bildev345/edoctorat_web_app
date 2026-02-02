package org.example.doctoratrestapi.dtos.inscription;

public record ScolariteSujetLookupDto(
        Long id,
        String titre,
        Long formationId,
        String formationTitre,
        Long cedId,
        String cedTitre,
        Long laboId,
        String laboTitre
) {}
