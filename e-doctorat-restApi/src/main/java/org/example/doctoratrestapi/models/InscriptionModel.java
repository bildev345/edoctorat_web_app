package org.example.doctoratrestapi.models;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="inscriptions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class InscriptionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dateDeposerDossier;
    private String remarque;
    private Boolean valider;

    @OneToOne
    @JoinColumn(name = "candidat_id")
    private CandidatModel candidat;

    @ManyToOne
    @JoinColumn(name = "sujet_id")
    private SujetModel sujet;

}
