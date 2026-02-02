package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.formationDoctorale.FormationDtoLabo;
import org.example.doctoratrestapi.mappers.formationDoctorale.FormationDoctoraleMapper;
import org.example.doctoratrestapi.repositories.FormationDoctoraleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FormationService {
    private final FormationDoctoraleRepository formationDoctoraleRepository;
    private final FormationDoctoraleMapper mapper;

    public List<FormationDtoLabo> selectFormations(){
        return formationDoctoraleRepository.findAll().stream()
                .map(mapper::formationDtoLabo)
                .toList();
    }
}
