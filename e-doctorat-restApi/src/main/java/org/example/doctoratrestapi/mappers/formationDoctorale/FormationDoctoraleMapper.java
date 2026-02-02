package org.example.doctoratrestapi.mappers.formationDoctorale;

import java.time.LocalDate;

import org.example.doctoratrestapi.dtos.formationDoctorale.FormationDoctoraleDTO;
import org.example.doctoratrestapi.dtos.formationDoctorale.FormationDtoLabo;
import org.example.doctoratrestapi.models.FormationDoctoraleModel;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FormationDoctoraleMapper {

    //Model to DTO
    public FormationDoctoraleDTO toDTO(FormationDoctoraleModel formation) {
        Long id = formation.getId();
        String titre = formation.getTitre();
        String initiale = formation.getInitiale();
        String axe = formation.getAxeDeRecherche();
        LocalDate dateAccr = formation.getDateAccreditation();
        String cedTitre = formation.getCed().getTitre();
        String etabNom = formation.getEtablissement().getNomEtablissement();
        String pathImage = formation.getPathImage();

        return FormationDoctoraleDTO.builder()
                .id(id)
                .titre(titre)
                .initiale(initiale)
                .axeDeRecherche(axe)
                .dateAccreditation(dateAccr)
                .cedTitre(cedTitre)
                .etablissementNom(etabNom)
                .pathImage(pathImage)
                .build();
    }

    //List Model to List DTO
    public List<FormationDoctoraleDTO> toDTOs(List<FormationDoctoraleModel> formations) {
        return formations.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    public FormationDtoLabo formationDtoLabo(FormationDoctoraleModel formation){
        return new FormationDtoLabo(formation.getId(), formation.getTitre());
    }
}
