package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doctoratrestapi.models.AnnexeModel;
import org.example.doctoratrestapi.models.CandidatModel;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="diplomes")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DiplomeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String intitule;
    private String type;
    private LocalDateTime dateCommission;
    private String mention;
    private String pays;
    private String etablissement;
    private String specialite;
    private String ville;
    private String province;
    private Double moyenneGenerale;
    @ManyToOne
    @JoinColumn(name="candidat_id")
    private CandidatModel candidat;

    @OneToMany(
            mappedBy = "diplome",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<AnnexeModel> annexes = new ArrayList<>();

}
