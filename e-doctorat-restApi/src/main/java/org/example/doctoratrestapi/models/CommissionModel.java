package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="commissions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommissionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate dateCommission;
    private String lieu;
    private Time heure;
    @ManyToOne
    @JoinColumn(name="labo_id")
    private LaboratoireModel laboratoire;

    @OneToMany(mappedBy = "commission")
    private List<CommissionProfesseurModel>  commissionProfesseurs=new ArrayList<CommissionProfesseurModel>();

    @OneToMany(mappedBy = "commission")
    private List<ExaminerModel> examiners;

}
