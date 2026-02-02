package org.example.doctoratrestapi.mappers.etablissement;

import org.example.doctoratrestapi.dtos.etablissement.EtablissementDTO;
import org.example.doctoratrestapi.models.EtablissementModel;
import org.example.doctoratrestapi.models.LaboratoireModel;
import org.example.doctoratrestapi.dtos.labo.LaboratoireDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EtablissementMapper {

    public EtablissementDTO toDTO(EtablissementModel etab) {
        Long etabId = etab.getId();
        String nom = etab.getNomEtablissement();
        int nombreLabos = etab.getLaboratoires().size();
        return EtablissementDTO.builder()
                .id(etabId)
                .nomEtablissement(nom)
                .nombreLabos(nombreLabos)
                .build();
    }

    public List<EtablissementDTO> toDTOs(List<EtablissementModel> etabs) {
        return etabs.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public LaboratoireDTO toLaboDTO(LaboratoireModel labo) {
        Long laboId = labo.getId();
        String nomLabo = labo.getNomLaboratoire();
        String cedTitre = labo.getCed().getTitre();
        String etabNom = labo.getEtablissement().getNomEtablissement();
        String dirNom = labo.getDirecteur().getUser().getUsername();

        return LaboratoireDTO.builder()
                .id(laboId)
                .nomLaboratoire(nomLabo)
                .cedTitre(cedTitre)
                .etablissementNom(etabNom)
                .directeurNom(dirNom)
                .build();
    }

    public List<LaboratoireDTO> toLaboDTOs(List<LaboratoireModel> labos) {
        return labos.stream()
                .map(this::toLaboDTO)
                .collect(Collectors.toList());
    }
}
