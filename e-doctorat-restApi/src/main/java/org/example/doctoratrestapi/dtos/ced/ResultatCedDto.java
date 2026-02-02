package org.example.doctoratrestapi.dtos.ced;

import lombok.Builder;

@Builder
public record ResultatCedDto(
        Long id,
        String sujetTitre,
        String cne,
        String candidatNomComplet,
        float noteDossier,      // Float bach tmatchi l-model
        int noteEntretien,    // int bach tmatchi l-model
        double moyenneGenerale,
        String decision
) {}