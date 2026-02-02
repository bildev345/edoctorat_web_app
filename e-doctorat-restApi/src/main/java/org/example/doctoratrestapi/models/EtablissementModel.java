package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="etablissements")
public class EtablissementModel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String nomEtablissement;

    @OneToMany(mappedBy ="etablissement")
    private List<LaboratoireModel> laboratoires=new ArrayList<LaboratoireModel>();

    @OneToMany(mappedBy = "etablissement")
    private List<FormationDoctoraleModel> formations = new ArrayList<>();

}

