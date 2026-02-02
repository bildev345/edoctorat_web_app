package org.example.doctoratrestapi.directeurPole.services;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.dtos.calendrier.CalendrierPoleDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.models.DirecteurPoleCalendrierModel;
import org.example.doctoratrestapi.repositories.DirecteurPoleCalendrierRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendrierPoleService {

    private final DirecteurPoleCalendrierRepository calendrierRepository;

    public List<CalendrierPoleDto> getCalendrier() {
        // Uses the DTO projection query defined in Repository
        return calendrierRepository.findAllCalendrier();
    }

    @Transactional
    public void updateCalendrier(Long id, LocalDateTime dateDebut, LocalDateTime dateFin) {
        // Fetch the ENTITY to update it
        DirecteurPoleCalendrierModel c = calendrierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Calendrier introuvable avec l'ID: " + id));

        c.setDateDebut(dateDebut);
        c.setDateFin(dateFin);
        // Transactional annotation automatically saves changes
    }
}