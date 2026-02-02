package org.example.doctoratrestapi.dtos.resultat;

public record ResultatPoleDto(
        Long id,
        String cne,
        String fullName,
        String sujet,
        String laboratoire,
        double moyenneGenerale,
        String decision,
        boolean publier
) {
}
