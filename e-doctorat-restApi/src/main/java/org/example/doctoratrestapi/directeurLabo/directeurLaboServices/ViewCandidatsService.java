package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.postuler.CandidatPostulesDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.repositories.PostulerRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ViewCandidatsService {
    private final PostulerRepository postulerRepository;
    private final ProfesseurRepository professeurRepository;

    public Page<CandidatPostulesDto> selectCandidatsByLabo(Pageable pageable){
        long userId = SecurityUtils.currentUserId();
        Optional<ProfesseurModel> professeur = Optional.ofNullable(professeurRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Le professeur n'existe pas")));
        long laboId = professeur.get().getLaboratoire().getId();        
        return postulerRepository.findCandidatsPostulesByLabo(laboId, pageable);
    }
}
