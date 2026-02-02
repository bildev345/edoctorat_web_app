package org.example.doctoratrestapi.dtos.professeur;

import java.util.List;
import org.example.doctoratrestapi.dtos.diplome.DiplomeDto;

public record CandidatProfDetailDto(
        String cne,
        String cin,
        String nom,
        String prenom,
        String adresse,
        String email,
        String pathPhoto,
        List<DiplomeDto> diplomes
) {}
