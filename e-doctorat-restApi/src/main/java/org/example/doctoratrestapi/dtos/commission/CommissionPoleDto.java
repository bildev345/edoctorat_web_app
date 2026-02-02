package org.example.doctoratrestapi.dtos.commission;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record CommissionPoleDto(
        Long id,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate date,
        @JsonFormat(pattern = "HH:mm")
        Time heure,
        String lieu,
        String sujet,        // Concatenated subjects (e.g., "Titre 1, Titre 2")
        List<String> membres, // List of Professor names
        String labo,
        String ced
) {}