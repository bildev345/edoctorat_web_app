package org.example.doctoratrestapi.directeurPole.services;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.common.PageResponseDto;
import org.example.doctoratrestapi.dtos.sujet.SujetPoleDto;
import org.example.doctoratrestapi.mappers.sujet.SujetPoleMapper;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SujetPoleService {

    private final SujetRepository sujetRepository;
    private final SujetPoleMapper mapper;
    private final ProfesseurRepository professeurRepository;

    public Page<SujetPoleDto> getSujetsPole(Pageable pageable) {
        return sujetRepository.findAllSujetsForPole(pageable);
    }
    public void publierSujets() {
        List<SujetModel> sujets = sujetRepository.findAll();
        for(SujetModel s : sujets){
            s.setPublier(true);
        }
        sujetRepository.saveAll(sujets);
    }
}

