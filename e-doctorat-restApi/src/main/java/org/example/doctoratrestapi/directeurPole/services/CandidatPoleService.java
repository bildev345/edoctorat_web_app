package org.example.doctoratrestapi.directeurPole.services;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.candidat.CandidatPoleDto;
import org.example.doctoratrestapi.mappers.candidat.CandidatPoleMapper;
import org.example.doctoratrestapi.repositories.PostulerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CandidatPoleService {

    private final PostulerRepository postulerRepository;
    private final CandidatPoleMapper candidatPoleMapper; // Inject Mapper

    @Transactional(readOnly = true)
    public Page<CandidatPoleDto> getPostulesPole(Pageable pageable) {
        // Fetch entities and map them to DTOs
        return postulerRepository.findAllPostulesForPole(pageable)
                .map(candidatPoleMapper::toDto);
    }
}