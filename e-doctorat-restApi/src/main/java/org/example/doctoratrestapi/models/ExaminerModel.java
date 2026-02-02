package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "examiner")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ExaminerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String decision;
    private  float noteDossier;
    private int noteEntretien;
    private boolean publier;
    @ManyToOne
    @JoinColumn(name = "commission_id")
    private CommissionModel commission;

    @ManyToOne
    @JoinColumn(name = "sujet_id")
    private SujetModel sujet;

    @ManyToOne
    @JoinColumn(name = "candidat_id")
    private CandidatModel candidat;

    private boolean valider;
    private Double moyenneGenerale;

}
