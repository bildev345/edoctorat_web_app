package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    @ManyToOne
    @JoinColumn(name="candidat_id")
    private CandidatModel candidat;

    @ManyToOne
    @JoinColumn(name="commission_id")
    private CommissionModel commission;

    @ManyToOne
    @JoinColumn(name="sujet_id")
    private SujetModel sujet;
}
