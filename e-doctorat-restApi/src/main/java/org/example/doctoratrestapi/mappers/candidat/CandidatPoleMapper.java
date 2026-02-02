package org.example.doctoratrestapi.mappers.candidat;

import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.PostulerModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.stereotype.Component;
import org.example.doctoratrestapi.dtos.candidat.CandidatPoleDto;
@Component
public class CandidatPoleMapper {

    public CandidatPoleDto toDto(PostulerModel p) {

        SujetModel s = p.getSujetModel();
        CandidatModel c = p.getCandidatModel();

        return new CandidatPoleDto(
                s.getTitre(),
                s.getProfesseur().getUser().getFirstName() + " " +
                        s.getProfesseur().getUser().getLastName(),
                s.getCoDirecteur() != null
                        ? s.getCoDirecteur().getUser().getFirstName() + " " +
                        s.getCoDirecteur().getUser().getLastName()
                        : null,
                c.getCne(),
                c.getUser().getLastName(),
                c.getUser().getFirstName(),
                s.getProfesseur().getLaboratoire().getNomLaboratoire(),
                s.getFormation().getTitre()
        );
    }
}

