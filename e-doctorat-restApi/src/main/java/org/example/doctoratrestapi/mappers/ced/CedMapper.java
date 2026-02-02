package org.example.doctoratrestapi.mappers.ced;

import org.example.doctoratrestapi.dtos.ced.*;
import org.example.doctoratrestapi.dtos.formationDoctorale.FormationDoctoraleDTO;
import org.example.doctoratrestapi.dtos.professeur.ProfesseurDto;
import org.example.doctoratrestapi.mappers.professeur.ProfesseurMapper;
import org.example.doctoratrestapi.models.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CedMapper {
    private final ProfesseurMapper profMapper;
    public CedMapper(ProfesseurMapper profMapper) {
        this.profMapper = profMapper;
    }
    // CedModel → CedDTO (les infos CED détaillé)
    public CedDTO toDTO(CedModel ced) {
        Long cedId = ced.getId();
        String titre = ced.getTitre();
        String initiale = ced.getInitiale();
        String description = ced.getDescription();
        ProfesseurDto directeur = profMapper.toDto(ced.getDirecteur());
        List<String> formationsIntitules = ced.getFormations().stream()
                .map(FormationDoctoraleModel::getTitre) // On prend juste le titre
                .collect(Collectors.toList());
        return new CedDTO(cedId, titre, initiale, description, directeur, formationsIntitules);    }

    // (tous CED)
    public List<CedDTO> toDTOs(List<CedModel> ceds) {
        return ceds.stream()
                .map(ced -> {
                    ProfesseurDto directeurDto = profMapper.toDto(ced.getDirecteur());
                    // Transformation ici aussi
                    List<String> formationsIntitules = ced.getFormations().stream()
                            .map(FormationDoctoraleModel::getTitre)
                            .collect(Collectors.toList());
                    return new CedDTO(ced.getId(), ced.getTitre(), ced.getInitiale(), ced.getDescription(), directeurDto, formationsIntitules);                })
                .collect(Collectors.toList());
    }

    // FormationDoctoraleModel(pour /ceds/{id}/formations)
    public FormationDoctoraleDTO toFormationDTO(FormationDoctoraleModel formation) {
        return FormationDoctoraleDTO.builder()
                .id(formation.getId())
                .titre(formation.getTitre())
                .build();
    }

    //List formations
    public List<FormationDoctoraleDTO> toFormationDTOs(List<FormationDoctoraleModel> formations) {
        return formations.stream()
                .map(this::toFormationDTO)
                .collect(Collectors.toList());
    }

    public SujetCedDto toSujetCedDto(SujetModel sujet) {

        // 1. Nom Directeur (Via Professeur -> User)
        String directeurNom = "Inconnu";
        if (sujet.getProfesseur() != null && sujet.getProfesseur().getUser() != null) {
            // On récupère le UserModel lié au Professeur
            var userProf = sujet.getProfesseur().getUser();
            // On concatène LastName (Nom) et FirstName (Prénom)
            directeurNom = userProf.getLastName().toUpperCase() + " " + userProf.getFirstName();
        }

        // 2. Nom Co-Directeur (Via Professeur -> User)
        String coDirecteurNom = "-";
        if (sujet.getCoDirecteur() != null && sujet.getCoDirecteur().getUser() != null) {
            // On récupère le UserModel lié au Co-Directeur
            var userCoDir = sujet.getCoDirecteur().getUser();
            coDirecteurNom = userCoDir.getLastName().toUpperCase() + " " + userCoDir.getFirstName();
        }

        // 3. Titre Formation
        String formationTitre = "Non spécifiée";
        if (sujet.getFormation() != null) {
            formationTitre = sujet.getFormation().getTitre();
        }

        // 4. Construction du DTO
        return SujetCedDto.builder()
                .id(sujet.getId())
                .titre(sujet.getTitre())
                .description(sujet.getDescription())
                .directeurNomComplet(directeurNom)
                .coDirecteurNomComplet(coDirecteurNom)
                .formationTitre(formationTitre)
                .build();
    }


    public CandidatCedDto toCandidatCedDto(CandidatModel candidat, SujetModel sujet) {

        // 1. Nom Complet Candidat
        String nomCandidat = "Inconnu";
        if (candidat.getUser() != null) {
            nomCandidat = candidat.getUser().getLastName().toUpperCase() + " " + candidat.getUser().getFirstName();
        }

        // 2. Infos Directeur & Labo
        String nomDirecteur = "Inconnu";
        String nomLabo = "-";

        if (sujet.getProfesseur() != null && sujet.getProfesseur().getUser() != null) {
            nomDirecteur = sujet.getProfesseur().getUser().getLastName().toUpperCase() + " " + sujet.getProfesseur().getUser().getFirstName();
            if (sujet.getProfesseur().getLaboratoire() != null) {
                nomLabo = sujet.getProfesseur().getLaboratoire().getNomLaboratoire();
            }
        }

        // 3. Infos Co-Directeur
        String nomCoDirecteur = "-";
        if (sujet.getCoDirecteur() != null && sujet.getCoDirecteur().getUser() != null) {
            nomCoDirecteur = sujet.getCoDirecteur().getUser().getLastName().toUpperCase() + " " + sujet.getCoDirecteur().getUser().getFirstName();
        }

        // 4. Formation
        String formationTitre = (sujet.getFormation() != null) ? sujet.getFormation().getTitre() : "-";

        // Construction
        return CandidatCedDto.builder()
                .id(candidat.getId())
                .cne(candidat.getCne())
                .nomComplet(nomCandidat)
                .sujetTitre(sujet.getTitre())
                .directeurNom(nomDirecteur)
                .coDirecteurNom(nomCoDirecteur)
                .formationTitre(formationTitre)
                .laboratoireNom(nomLabo)
                .build();
    }
    // Zidi had l-methode f CedMapper.java
    public CommissionCedDto toCommissionCedDto(CommissionModel model, List<SujetModel> sujetsLies) {
        // 1. Jebdi smiyat l-assatida mn commissionProfesseurs
        List<String> nomsMembres = model.getCommissionProfesseurs().stream()
                .map(cp -> cp.getProfesseur().getUser().getLastName().toUpperCase() + " " + cp.getProfesseur().getUser().getFirstName())
                .collect(Collectors.toList());

        // 2. Jebdi les titres dyal les sujets
        List<String> titresSujets = sujetsLies.stream()
                .map(SujetModel::getTitre)
                .distinct()
                .collect(Collectors.toList());

        return CommissionCedDto.builder()
                .id(model.getId())
                .date(model.getDateCommission())
                .lieu(model.getLieu())
                .heure(model.getHeure().toString())
                .laboratoire(model.getLaboratoire() != null ? model.getLaboratoire().getNomLaboratoire() : "-")
                .membres(nomsMembres)
                .sujets(titresSujets)
                .build();
    }

    public ResultatCedDto toResultatCedDto(ExaminerModel model) {
        if (model == null) return null;

        // 1. Jebdi m3loumat l-candidat
        String nomCandidat = "-";
        String cne = "-";
        if (model.getCandidat() != null) {
            cne = model.getCandidat().getCne();
            if (model.getCandidat().getUser() != null) {
                nomCandidat = model.getCandidat().getUser().getLastName().toUpperCase() +
                        " " + model.getCandidat().getUser().getFirstName();
            }
        }

        // 2. Jebdi titre dyal sujet
        String titreSujet = (model.getSujet() != null) ? model.getSujet().getTitre() : "-";

        // 3. Calcul dyal l-moyenne (Exemple: 50% dossier, 50% entretien)
        double moyenne = (model.getNoteDossier() + model.getNoteEntretien()) / 2.0;

        return ResultatCedDto.builder()
                .id(model.getId())
                .sujetTitre(titreSujet)
                .cne(cne)
                .candidatNomComplet(nomCandidat)
                .noteDossier(model.getNoteDossier())   // Smiya s-shiha
                .noteEntretien(model.getNoteEntretien()) // Smiya s-shiha
                .moyenneGenerale(moyenne)
                .decision(model.getDecision())           // Smiya s-shiha (mashi statut)
                .build();
    }

    public InscriptionCedDto toInscriptionCedDto(InscriptionModel model) {
        return InscriptionCedDto.builder()
                .id(model.getId())
                .cne(model.getCandidat().getCne())
                .nomComplet(model.getCandidat().getNomCandidatArabe() + " " + model.getCandidat().getPrenomCandidatArabe())
                .sujetTitre(model.getSujet().getTitre())
                .formationTitre(model.getSujet().getFormation().getTitre())
                .dateDepot(model.getDateDeposerDossier() != null ? model.getDateDeposerDossier().toString() : "")
                .estValide(model.getValider())
                .remarque(model.getRemarque())
                .build();
    }
}
