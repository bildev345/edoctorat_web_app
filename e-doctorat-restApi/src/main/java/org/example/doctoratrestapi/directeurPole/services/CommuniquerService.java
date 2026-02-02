package org.example.doctoratrestapi.directeurPole.services;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.resultat.ResultatPoleDto;
import org.example.doctoratrestapi.mappers.resultat.ResultatPoleMapper;
import org.example.doctoratrestapi.repositories.ExaminerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommuniquerService {

    private final ExaminerRepository examinerRepository;
    private final ResultatPoleMapper mapper;
    private final CedRepository cedRepository;

    @Transactional
    public void publierDecisionPourPole(String decision, List<Long> cedIds) {
        // Optimized bulk update
        examinerRepository.publierResultatsMassive(cedIds, decision);
    }

    public Page<ResultatPoleDto> getResultatsPole(String decision, List<Long> cedIds, Pageable pageable) {
        return examinerRepository
                .findByDecisionForPole(cedIds, decision, pageable)
                .map(mapper::toDto);
    }

    public List<Long> getAllCedIds() {
        return cedRepository.findAllCedIds();
    }

    // Logic for PDF generation would go here (or call a PdfService)
    public byte[] generatePdfResultats(String decision, List<Long> cedIds) {
        // Placeholder for PDF generation logic (using iText or OpenPDF)
        return new byte[0];
    }
}