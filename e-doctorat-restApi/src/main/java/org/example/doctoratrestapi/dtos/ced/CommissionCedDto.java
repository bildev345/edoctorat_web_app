package org.example.doctoratrestapi.dtos.ced;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.sql.Time;
import java.util.List;

@Data
@Builder
public class CommissionCedDto {
    private Long id;
    private LocalDate date;
    private String lieu;
    private String heure;
    private String laboratoire;
    private List<String> membres; // Smiyat l-assatida
    private List<String> sujets;  // Titres dyal les sujets
}