package org.example.doctoratrestapi.dtos.examination;

public record ResultatExaminationDto(
        long id,
        String cneCandidat,
        String nomCandidat,
        String sujetTitre,
        double noteDossier,
        long noteEntretien,
        double moyenneGenerale,
        String decision
) {
}

