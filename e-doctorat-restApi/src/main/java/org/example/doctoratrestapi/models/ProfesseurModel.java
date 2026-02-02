package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doctoratrestapi.user.UserModel;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "professeurs")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProfesseurModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cin;
    private String telProfesseur;
    private String pathPhoto;
    private String grade;
    private String numSom;
    private int nombreEncadrent;
    private int nombreProposer;
    @ManyToOne
    @JoinColumn(name = "etablissement_id")
    private EtablissementModel etablissement;

    @ManyToOne
    @JoinColumn(name = "labo_id")
    private LaboratoireModel laboratoire;

    @OneToMany(mappedBy = "professeur")
    private List<CommissionProfesseurModel> commissionProfesseurs = new ArrayList<>();

    @OneToOne
    @JoinColumn(name="user_id")
    private UserModel user;

    @OneToMany(mappedBy="professeur")
    private List<SujetModel> sujets = new ArrayList<>();
}
