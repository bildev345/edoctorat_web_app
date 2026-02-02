package org.example.doctoratrestapi.dtos.inscription;

import java.time.LocalDate;

public record InscriptionPoleDto(
        Long id,
        String cne,
        String nom,
        String prenom,
        String sujet,
        String laboratoire, // Fetched via Professor
        String ced,
        LocalDate dateDepot,
        Boolean valider
) {}