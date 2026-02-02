package org.example.doctoratrestapi.dtos.sujet;

public record SujetPoleDto(
        Long id,
        String titre,
        String directeur,
        String coDirecteur,
        String laboratoire,
        String formationDoctorale,
        String ced,
        boolean publier
) {
}
