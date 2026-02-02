package org.example.doctoratrestapi.models;

import jakarta.persistence.*;
import lombok.*;
import org.example.doctoratrestapi.models.DiplomeModel;
import org.example.doctoratrestapi.user.UserModel;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "candidats")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CandidatModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//avec identity on peut spécifier par quoi commence l'auto-increment et le pas aussi
    private long id;
    private String cne;
    private String cin;
    private String nom;
    private String prenom;
    private String nomCandidatArabe;
    private String prenomCandidatArabe;
    private String adresse;
    private String email;
    private String adresseArabe;
    private String sexe;
    private String villeDeNaissance;
    private String villeDeNaissanceArabe;
    private String ville;
    private LocalDate dateDeNaissance;
    private String typeDeHandicape;
    private String academie;
    private String telCandidat;
    private String pathCv;
    private String pathPhoto;
    private int etatDossier;
    private String situationFamiliale;
    private boolean dossierValide = false;
    @ManyToOne
    @JoinColumn(name="pays_id")
    private PaysModel pays;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    private boolean fonctionaire;

    @OneToMany(mappedBy ="candidat")
    private List<DiplomeModel> diplomes= new ArrayList<DiplomeModel>();

    @OneToMany(mappedBy = "candidat")
    private List<NotificationModel> notifications=new ArrayList<NotificationModel>();

    @OneToOne(mappedBy = "candidat")
    private InscriptionModel inscription;
}

