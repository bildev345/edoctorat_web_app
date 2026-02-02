package org.example.doctoratrestapi.mappers.candidat;

import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.PaysModel;
import org.example.doctoratrestapi.user.UserModel;
import org.springframework.stereotype.Component;

@Component
public class CandidatMapper {

    // Entity -> DTO (Lecture)
    public CandidatDto toDto(CandidatModel candidat) {
        if (candidat == null) {
            return null;
        }

        return CandidatDto.builder()
                .cne(candidat.getCne())
                .cin(candidat.getCin())
                .nom(candidat.getNom())
                .prenom(candidat.getPrenom())
                .adresse(candidat.getAdresse())
                .villeDeNaissance(candidat.getVilleDeNaissance())

                // Mappage des champs Arabes
                .nomArabe(candidat.getNomCandidatArabe())
                .prenomArabe(candidat.getPrenomCandidatArabe())
                .adresseArabe(candidat.getAdresseArabe())
                .villeDeNaissanceArabe(candidat.getVilleDeNaissanceArabe())

                .sexe(candidat.getSexe())
                .ville(candidat.getVille())
                .dateDeNaissance(candidat.getDateDeNaissance())
                .typeDeHandicape(candidat.getTypeDeHandicape())
                .academie(candidat.getAcademie())
                .telCandidat(candidat.getTelCandidat())
                .situationFamiliale(candidat.getSituationFamiliale())
                .fonctionaire(candidat.isFonctionaire())

                // Fichiers
                .pathCv(candidat.getPathCv())
                .pathPhoto(candidat.getPathPhoto())

                // Relations (Extraction des ID)
                .paysId(candidat.getPays() != null ? candidat.getPays().getId() : null)
                .build();
    }

    // DTO -> Entity (Écriture/Sauvegarde)
    public CandidatModel toCandidatEntity(CandidatDto dto) {
        if (dto == null) {
            return null;
        }

        CandidatModel candidat = new CandidatModel();

        // Identifiants de base
        candidat.setCne(dto.getCne());
        candidat.setCin(dto.getCin());
        candidat.setNom(dto.getNom());
        candidat.setPrenom(dto.getPrenom());

        // Coordonnées & Naissance
        candidat.setAdresse(dto.getAdresse());
        candidat.setVille(dto.getVille());
        candidat.setDateDeNaissance(dto.getDateDeNaissance());
        candidat.setVilleDeNaissance(dto.getVilleDeNaissance());
        candidat.setTelCandidat(dto.getTelCandidat());

        // Infos Arabes
        candidat.setNomCandidatArabe(dto.getNomArabe());
        candidat.setPrenomCandidatArabe(dto.getPrenomArabe());
        candidat.setAdresseArabe(dto.getAdresseArabe());
        candidat.setVilleDeNaissanceArabe(dto.getVilleDeNaissanceArabe());

        // Autres infos
        candidat.setSexe(dto.getSexe());
        candidat.setSituationFamiliale(dto.getSituationFamiliale());
        candidat.setAcademie(dto.getAcademie());
        candidat.setTypeDeHandicape(dto.getTypeDeHandicape());
        candidat.setFonctionaire(dto.isFonctionaire());

        // Fichiers
        candidat.setPathCv(dto.getPathCv());
        candidat.setPathPhoto(dto.getPathPhoto());

        // GESTION RELATION PAYS
        if (dto.getPaysId() != null) {
            PaysModel pays = new PaysModel();
            pays.setId(dto.getPaysId());
            candidat.setPays(pays);
        }

        // GESTION RELATION USER

        return candidat;
    }
}