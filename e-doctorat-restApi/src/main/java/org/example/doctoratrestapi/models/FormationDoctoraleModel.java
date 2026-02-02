package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDate;

@Entity
@Data
@Table(name = "formation_doctorales")
public class FormationDoctoraleModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pathImage;

    private String initiale;

    private String titre;

    @Column(columnDefinition = "longtext")
    private String axeDeRecherche;

    private LocalDate dateAccreditation;

    @ManyToOne
    @JoinColumn(name = "ced_id")
    private CedModel ced;              // mappe professeur_ced

    @ManyToOne
    @JoinColumn(name = "etablissement_id")
    private EtablissementModel etablissement;   // mappe professeur_etablissement

}
