package org.example.doctoratrestapi.dtos.sujet;

import java.util.List;

public record SujetCandidatsDto(
        Long sujetId,
        List<Long> candidatIds
) {
    public SujetCandidatsDto{
        if(candidatIds == null || candidatIds.isEmpty()){
            throw new IllegalArgumentException("Au moins un candidat doit etre sélectionné");
        }
    }

}
