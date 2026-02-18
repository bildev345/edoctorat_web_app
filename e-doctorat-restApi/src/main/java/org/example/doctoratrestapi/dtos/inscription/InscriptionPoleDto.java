package org.example.doctoratrestapi.dtos.inscription;

import java.time.LocalDate;

public record InscriptionPoleDto(
        Long id,
        String cne,
        String nom,
        String prenom,
        String sujet,
        String laboratoire,
        String ced,
        LocalDate dateDepot
) {}