package org.example.doctoratrestapi.dtos.commission;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommissionCreationDto {

    // Maps to <input type="date"> (e.g., "2023-12-31")
    private LocalDate dateCommission;

    // Maps to <input type="time"> (e.g., "14:30")
    private Time heureCommission;

    private String lieu;

    // List of selected Subject IDs
    private List<Long> sujetIds;

    // List of selected Professor IDs (Jury members)
    private List<Long> membreIds;

    private Long laboId;
}