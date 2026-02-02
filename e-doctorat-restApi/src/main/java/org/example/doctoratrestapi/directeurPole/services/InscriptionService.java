package org.example.doctoratrestapi.directeurPole.services;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.inscription.InscriptionPoleDto;
import org.example.doctoratrestapi.repositories.InscriptionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InscriptionService {

    private final InscriptionRepository inscriptionRepository;
    private final CedRepository cedRepository;

    @Transactional(readOnly = true)
    public Page<InscriptionPoleDto> getInscriptions(Pageable pageable) {
        List<Long> cedIds = cedRepository.findAllCedIds();
        return inscriptionRepository.findValidatedInscriptionsByPole(cedIds, pageable);
    }

    @Transactional(readOnly = true)
    public byte[] generateRapportInscription() {
        List<Long> cedIds = cedRepository.findAllCedIds();
        List<InscriptionPoleDto> inscrits = inscriptionRepository.findAllValidatedInscriptionsByPole(cedIds);

        // Generate CSV content
        StringBuilder csv = new StringBuilder();
        // CSV Header
        csv.append("CNE;NOM;PRENOM;SUJET;LABORATOIRE;CED;DATE_DEPOT\n");

        for (InscriptionPoleDto dto : inscrits) {
            csv.append(dto.cne() != null ? dto.cne() : "").append(";")
                    .append(dto.nom()).append(";")
                    .append(dto.prenom()).append(";")
                    // Escape quotes in Subject title
                    .append("\"").append(dto.sujet().replace("\"", "\"\"")).append("\";")
                    .append(dto.laboratoire()).append(";")
                    .append(dto.ced()).append(";")
                    .append(dto.dateDepot()).append("\n");
        }

        // Return bytes with BOM for Excel compatibility if needed, or just UTF-8
        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }
}