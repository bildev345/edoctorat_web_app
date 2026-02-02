package org.example.doctoratrestapi.dtos.calendrier;

import java.time.LocalDateTime;

public record CalendrierPoleDto(
        Long id,
        String action,
        LocalDateTime dateDebut,
        LocalDateTime dateFin,
        String pour
) {}

