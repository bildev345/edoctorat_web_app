package org.example.doctoratrestapi.mappers.annexe;

import org.example.doctoratrestapi.dtos.annexe.AnnexeDto;
import org.example.doctoratrestapi.models.AnnexeModel;
import org.springframework.stereotype.Component;

@Component
public class AnnexeMapper {

    public AnnexeModel toEntity(AnnexeDto dto) {
        if (dto == null) return null;

        AnnexeModel annexe = new AnnexeModel();
        annexe.setTypeAnnexe(dto.getTypeAnnexe());
        annexe.setTitre(dto.getTitre());
        annexe.setPathFile(dto.getPathFile());
        return annexe;
    }

    public AnnexeDto toDto(AnnexeModel entity) {
        if (entity == null) return null;

        AnnexeDto dto = new AnnexeDto();
        dto.setTypeAnnexe(entity.getTypeAnnexe());
        dto.setTitre(entity.getTitre());
        dto.setPathFile(entity.getPathFile());
        return dto;
    }
}