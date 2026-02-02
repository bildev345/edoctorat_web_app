package org.example.doctoratrestapi.mappers.laboratoire;

import org.example.doctoratrestapi.dtos.labo.LaboratoireDTO;
import org.example.doctoratrestapi.models.LaboratoireModel;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LaboratoireMapper {

    public LaboratoireDTO toDTO(LaboratoireModel labo) {

        String cedTitre = (labo.getCed() != null) ? labo.getCed().getTitre() : null;
        String etabNom = (labo.getEtablissement() != null) ? labo.getEtablissement().getNomEtablissement() : null;

        String dirNom = null;
        if (labo.getDirecteur() != null && labo.getDirecteur().getUser() != null) {
            dirNom = labo.getDirecteur().getUser().getUsername();
        }

        return LaboratoireDTO.builder()
                .id(labo.getId())
                .nomLaboratoire(labo.getNomLaboratoire())
                .cedTitre(cedTitre)
                .etablissementNom(etabNom)
                .directeurNom(dirNom)
                .build();
    }

    public List<LaboratoireDTO> toDTOs(List<LaboratoireModel> labos) {
        return labos.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
