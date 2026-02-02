package org.example.doctoratrestapi.mappers.sujet;

import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.stereotype.Component;
import org.example.doctoratrestapi.dtos.sujet.SujetPoleDto;

@Component
public class SujetPoleMapper {

    public SujetPoleDto toDto(SujetModel s) {
        return new SujetPoleDto(
                s.getId(),
                s.getTitre(),
                s.getProfesseur().getUser().getFirstName() + " " +
                        s.getProfesseur().getUser().getLastName(),
                s.getCoDirecteur() != null
                        ? s.getCoDirecteur().getUser().getFirstName() + " " +
                        s.getCoDirecteur().getUser().getLastName()
                        : null,
                s.getProfesseur().getLaboratoire().getNomLaboratoire(),
                s.getFormation().getTitre(),
                s.getFormation().getCed().getTitre(),
                s.isPublier()
        );
    }
}

