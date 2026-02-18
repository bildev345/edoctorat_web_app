package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.common.PageResponseDto;
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

    public PageResponseDto<SujetLaboDto> selectSujetsByLabo(Pageable pageable, String filter) {
        long userId = SecurityUtils.currentUserId();

        ProfesseurModel professeur = professeurRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Le professeur n'existe pas")
                );

        long laboId = professeur.getLaboratoire().getId();

        Page<SujetModel> sujetsPage;
        
        // Apply filter if provided
        if (filter != null && !filter.trim().isEmpty()) {
            sujetsPage = sujetRepo.getSujetsByLaboIdAndTitreContaining(laboId, filter, pageable);
        } else {
            sujetsPage = sujetRepo.getSujetsByLaboId(laboId, pageable);
        }

        Page<SujetLaboDto> dtoPage = sujetsPage.map(sujetMapper::toSujetLaboDto);

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
        // Validate that directeurId is not null
        if (dto.directeurId() == null) {
            throw new IllegalArgumentException("Le directeur est obligatoire");
        }
        
        // Validate that formationDoctoraleId is not null
        if (dto.formationDoctoraleId() == null) {
            throw new IllegalArgumentException("La formation doctorale est obligatoire");
        }

        // Get the current user (directeur labo)
        long userId = SecurityUtils.currentUserId();
        ProfesseurModel directeurLabo = professeurRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Le directeur de laboratoire n'existe pas"));

        // Get the directeur (thesis director)
        ProfesseurModel directeur = professeurRepository.findById(dto.directeurId())
                .orElseThrow(() -> new ResourceNotFoundException("Le directeur de thèse avec l'ID " + dto.directeurId() + " n'existe pas"));
        
        // Get the co-directeur (optional)
        ProfesseurModel coDirecteur = null;
        if (dto.coDirecteurId() != null && dto.coDirecteurId() > 0) {
            coDirecteur = professeurRepository.findById(dto.coDirecteurId())
                    .orElseThrow(() -> new ResourceNotFoundException("Le co-directeur avec l'ID " + dto.coDirecteurId() + " n'existe pas"));
        }
        
        // Get the formation doctorale
        FormationDoctoraleModel formation = formationRepo.findById(dto.formationDoctoraleId())
                .orElseThrow(() -> new ResourceNotFoundException("La formation doctorale avec l'ID " + dto.formationDoctoraleId() + " n'existe pas"));
        
        // Create and save the sujet
        SujetModel sujet = sujetMapper.toSujet(dto, formation, directeur, coDirecteur);
        sujetRepo.save(sujet);
    }
}