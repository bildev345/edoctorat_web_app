package org.example.doctoratrestapi.dtos.commission;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;


public record CommissionDTO(
        long commissionId,
        LocalDate dateCommission,
        String lieu,
        Time heure,
        List<String> sujetsTitres,
        List <String> membresNames) {
}
