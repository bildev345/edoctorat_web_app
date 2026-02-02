package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="directeur_pole_calendrier")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DirecteurPoleCalendrierModel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String action;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private String pour;
}
