package org.example.doctoratrestapi.dtos.inscription;

public record ScolariteCandidatLookupDto(
        Long id,
        String cne,
        String nomCandidatArabe,
        String prenomCandidatArabe
) {}
