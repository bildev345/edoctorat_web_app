package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doctoratrestapi.models.DiplomeModel;

@Entity
@Table(name="annexes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnnexeModel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String typeAnnexe;
    private String titre;
    private String pathFile;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diplome_id", nullable = false)
    private DiplomeModel diplome;

}
