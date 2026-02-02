package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sujets")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class SujetModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String description;
    private boolean publier;
    @OneToOne
    @JoinColumn(name = "coDirecteur_id")
    private ProfesseurModel coDirecteur;

    @ManyToOne
    @JoinColumn(name = "professeur_id")
    private ProfesseurModel professeur;

    @ManyToOne
    @JoinColumn(name = "formationDotorale_id")
    private FormationDoctoraleModel formation;

    @OneToMany(mappedBy = "sujet")
    private List<InscriptionModel> inscriptions = new ArrayList<InscriptionModel>();

    @OneToMany(mappedBy = "sujet")
    private List<ExaminerModel> examinations = new ArrayList<>();

    @OneToMany(mappedBy = "sujetModel")
    private List<PostulerModel> postulations = new ArrayList<>();

}
