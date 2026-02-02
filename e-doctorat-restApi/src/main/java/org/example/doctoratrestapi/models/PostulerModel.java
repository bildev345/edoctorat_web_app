package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "postuler")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class PostulerModel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String pathFile;
    @ManyToOne
    @JoinColumn(name="candidat_id")
    private CandidatModel candidatModel;

    @ManyToOne
    @JoinColumn(name="sujet_id")
    private SujetModel sujetModel;



}
