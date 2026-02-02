package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.professeur.ProfesseurLaboDto;
import org.example.doctoratrestapi.mappers.professeur.ProfesseurMapper;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProfService {
    private final ProfesseurRepository professeurRepository;
    private final ProfesseurMapper professeurMapper;
    public List<ProfesseurLaboDto> selectProfs(){
        return professeurRepository.findAll().stream()
                .map(professeurMapper::toProfesseurLaboDto)
                .toList();
    }
}
