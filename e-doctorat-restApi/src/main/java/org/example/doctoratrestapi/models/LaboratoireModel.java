package org.example.doctoratrestapi.models;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="laboratoires")
public class LaboratoireModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomLaboratoire;
    private String description;
    private String pathImage;
    private String initial;
    @ManyToOne
    @JoinColumn(name = "ced_id")
    private CedModel ced;

    @OneToOne
    @JoinColumn(name="directeur_id")
    private ProfesseurModel directeur;

    @ManyToOne
    @JoinColumn(name="etablissement_id")
    private EtablissementModel etablissement;

}