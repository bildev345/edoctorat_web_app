package org.example.doctoratrestapi.mappers.postuler;

import org.example.doctoratrestapi.dtos.postuler.PostulerDto;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.PostulerModel;
import org.example.doctoratrestapi.dtos.postuler.PostulerCreationDTO;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.stereotype.Component;

@Component
public class PostulerMapper {

    public PostulerDto toDto(PostulerModel postulerModel) {

        PostulerDto dto = new PostulerDto();

        dto.setSujetId(postulerModel.getSujetModel().getId());
        dto.setPathFile(postulerModel.getPathFile());

        return dto;
    }

    public PostulerModel toModel(PostulerCreationDTO dtoCreation,
                                 CandidatModel candidatModel,
                                 SujetModel sujetModel) {

        PostulerModel postulerModel = new PostulerModel();
        postulerModel.setCandidatModel(candidatModel);
        postulerModel.setSujetModel(sujetModel);
        postulerModel.setPathFile(dtoCreation.getPathFile());

        return postulerModel;
    }
}
