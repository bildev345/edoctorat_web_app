package org.example.doctoratrestapi.mappers.sujet;

import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoCreation;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDto;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDtoCreation;
import org.example.doctoratrestapi.models.FormationDoctoraleModel;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.stereotype.Component;
@Component
public class SujetMapper {

    public SujetDTO toDTO(SujetModel sujet) {
        if (sujet == null) return null;

        Long formationDoctoralId = (sujet.getFormation() != null) ? sujet.getFormation().getId() : null;
        String titreFormationDoctoral = (sujet.getFormation() != null) ? sujet.getFormation().getTitre() : null;

        Long coId = (sujet.getCoDirecteur() != null) ? sujet.getCoDirecteur().getId() : null;

        String coLabel = null;
        if (sujet.getCoDirecteur() != null && sujet.getCoDirecteur().getUser() != null) {
            var u = sujet.getCoDirecteur().getUser();

            // adapte selon TON UserModel (choisis ce que tu as vraiment)
            String full = "";

            // si ton UserModel a firstName/lastName
            if (u.getFirstName() != null) full += u.getFirstName();
            if (u.getLastName() != null) full += " " + u.getLastName();

            full = full.trim();
            if (!full.isBlank()) coLabel = full;
            else if (u.getUsername() != null) coLabel = u.getUsername(); // ou email si tu as getEmail()
        }

        return new SujetDTO(
                sujet.getId(),
                sujet.getTitre(),
                sujet.getDescription(),
                sujet.isPublier(),
                formationDoctoralId,
                titreFormationDoctoral,
                coId,
                coLabel
        );
    }

    public SujetModel toSujet(SujetDtoCreation dto, FormationDoctoraleModel formation, ProfesseurModel coDirecteur) {
        SujetModel sujet = new SujetModel();

        sujet.setTitre(dto.getTitre());
        sujet.setDescription(dto.getDescription());
        sujet.setPublier(dto.isPublier());

        sujet.setFormation(formation);       // obligatoire
        sujet.setCoDirecteur(coDirecteur);   // optionnel
        return sujet;
    }
    public SujetModel toSujet(SujetLaboDtoCreation dto, FormationDoctoraleModel formation, ProfesseurModel professeur, ProfesseurModel coDirecteur){
        SujetModel sujet = new SujetModel();
        sujet.setTitre(dto.titre());
        sujet.setDescription(dto.description());
        sujet.setProfesseur(professeur);
        sujet.setCoDirecteur(coDirecteur);
        sujet.setFormation(formation);
        return sujet;
    }

    public SujetLaboDto toSujetLaboDto(SujetModel sujet) {
        if (sujet == null) {
            return null;
        }

        return new SujetLaboDto(
                sujet.getId(),
                sujet.getTitre(),
                getProfesseurFullName(sujet.getProfesseur()),
                getProfesseurFullName(sujet.getCoDirecteur()),
                sujet.getFormation() != null
                        ? sujet.getFormation().getTitre()
                        : null
        );
    }
    private String getProfesseurFullName(ProfesseurModel professeur) {
        if (professeur == null || professeur.getUser() == null) {
            return null;
        }

        return professeur.getUser().getFirstName() + " " +
                professeur.getUser().getLastName();
    }

}
