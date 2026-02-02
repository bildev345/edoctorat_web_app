package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.common.PageResponseDto;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoCreation;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDto;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDtoCreation;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.repositories.FormationDoctoraleRepository;
import org.example.doctoratrestapi.mappers.sujet.SujetMapper;
import org.example.doctoratrestapi.models.FormationDoctoraleModel;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
@Service
public class SujetManagementService {
    private final ProfesseurRepository professeurRepository;
    private final FormationDoctoraleRepository formationRepo;
    private final SujetRepository sujetRepo;
    private final SujetMapper sujetMapper;

    public PageResponseDto<SujetLaboDto> selectSujetsByLabo(Pageable pageable) {

        long userId = SecurityUtils.currentUserId();

        ProfesseurModel professeur = professeurRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Le professeur n'existe pas")
                );

        long laboId = professeur.getLaboratoire().getId();

        Page<SujetModel> sujetsPage =
                sujetRepo.getSujetsByLaboId(laboId, pageable);

        Page<SujetLaboDto> dtoPage =
                sujetsPage.map(sujetMapper::toSujetLaboDto);

        return new PageResponseDto<>(
                dtoPage.getContent(),
                dtoPage.getNumber(),
                dtoPage.getSize(),
                dtoPage.getTotalElements(),
                dtoPage.getTotalPages()
        );
    }
    public List<SujetModel> selectSujetsByLabo(){
        long userId = SecurityUtils.currentUserId();

        ProfesseurModel professeur = professeurRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Le professeur n'existe pas")
                );

        long laboId = professeur.getLaboratoire().getId();
        return sujetRepo.getSujetsByLaboId(laboId);
    }


    public void addSujet(SujetLaboDtoCreation dto){
        long userId = SecurityUtils.currentUserId();
        Optional<ProfesseurModel> professeur = Optional.ofNullable(professeurRepository.findByUserId(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Le professeur n'existe pas"));
        Optional<ProfesseurModel> coDirecteur = professeurRepository.findById(dto.coDirecteurId());
        Optional<FormationDoctoraleModel> formation = Optional.of(formationRepo.findById(dto.FormationDoctoralId()))
                .orElseThrow(() -> new ResourceNotFoundException("La formation doctorale n'exist pas"));
        SujetModel sujet = sujetMapper.toSujet(dto, formation.get(), professeur.get(), coDirecteur.get());

    }
}
