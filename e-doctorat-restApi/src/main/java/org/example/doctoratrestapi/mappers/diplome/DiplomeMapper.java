package org.example.doctoratrestapi.mappers.diplome;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.annexe.AnnexeDto;
import org.example.doctoratrestapi.dtos.diplome.DiplomeDto;
import org.example.doctoratrestapi.models.AnnexeModel;
import org.example.doctoratrestapi.mappers.annexe.AnnexeMapper;
import org.example.doctoratrestapi.models.DiplomeModel;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DiplomeMapper {

    private final AnnexeMapper annexeMapper;

    public DiplomeModel toEntity(DiplomeDto dto) {
        if (dto == null) return null;

        DiplomeModel diplome = new DiplomeModel();
        diplome.setIntitule(dto.getIntitule());
        diplome.setType(dto.getType());
        diplome.setDateCommission(dto.getDateCommission());
        diplome.setMention(dto.getMention());
        diplome.setPays(dto.getPays());
        diplome.setEtablissement(dto.getEtablissement());
        diplome.setSpecialite(dto.getSpecialite());
        diplome.setVille(dto.getVille());
        diplome.setProvince(dto.getProvince());
        diplome.setMoyenneGenerale(dto.getMoyenneGenerale());

        // --- GESTION DES ANNEXES ---
        if (dto.getAnnexes() != null && !dto.getAnnexes().isEmpty()) {
            List<AnnexeModel> annexesList = new ArrayList<>();

            for (AnnexeDto annexeDto : dto.getAnnexes()) {
                AnnexeModel annexeModel = annexeMapper.toEntity(annexeDto);

                if (annexeModel != null) {
                    // Lier l'enfant au parent
                    annexeModel.setDiplome(diplome);
                    annexesList.add(annexeModel);
                }
            }
            // CORRECTION ICI : On passe directement la liste, sans "(Set...)"
            diplome.setAnnexes(annexesList);
        }

        return diplome;
    }

    public DiplomeDto toDto(DiplomeModel entity) {
        if (entity == null) return null;

        DiplomeDto dto = new DiplomeDto();
        dto.setIntitule(entity.getIntitule());
        dto.setType(entity.getType());
        dto.setDateCommission(entity.getDateCommission());
        dto.setMention(entity.getMention());
        dto.setPays(entity.getPays());
        dto.setEtablissement(entity.getEtablissement());
        dto.setSpecialite(entity.getSpecialite());
        dto.setVille(entity.getVille());
        dto.setProvince(entity.getProvince());
        dto.setMoyenneGenerale(entity.getMoyenneGenerale());

        if (entity.getAnnexes() != null) {
            dto.setAnnexes(entity.getAnnexes().stream()
                    .map(annexeMapper::toDto)
                    .collect(Collectors.toList()));
        }
        return dto;
    }
}