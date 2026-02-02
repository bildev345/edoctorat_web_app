package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="commission_professeurs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommissionProfesseurModel {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name="id")
   private long id;
   @ManyToOne
   @JoinColumn(name="commission_id")
   private CommissionModel commission;
   @ManyToOne
   @JoinColumn(name="professeur_id")
   private ProfesseurModel professeur;
}
