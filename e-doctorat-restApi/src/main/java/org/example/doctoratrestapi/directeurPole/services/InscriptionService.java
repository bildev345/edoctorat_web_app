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
import java.io.ByteArrayOutputStream;
import java.io.IOException;

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

        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            
            // Add BOM (Byte Order Mark) for Excel UTF-8 compatibility
            outputStream.write(0xEF);
            outputStream.write(0xBB);
            outputStream.write(0xBF);
            
            // Generate CSV content
            StringBuilder csv = new StringBuilder();
            
            // CSV Header
            csv.append("CNE;NOM;PRENOM;SUJET;LABORATOIRE;CED;DATE_DEPOT\n");

            // CSV Rows
            for (InscriptionPoleDto dto : inscrits) {
                csv.append(escapeCsvField(dto.cne())).append(";")
                   .append(escapeCsvField(dto.nom())).append(";")
                   .append(escapeCsvField(dto.prenom())).append(";")
                   .append(escapeCsvField(dto.sujet())).append(";")
                   .append(escapeCsvField(dto.laboratoire())).append(";")
                   .append(escapeCsvField(dto.ced())).append(";")
                   .append(escapeCsvField(dto.dateDepot() != null ? dto.dateDepot().toString() : ""))
                   .append("\n");
            }

            // Write CSV content to output stream
            outputStream.write(csv.toString().getBytes(StandardCharsets.UTF_8));
            
            return outputStream.toByteArray();
            
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la génération du rapport CSV", e);
        }
    }

    /**
     * Escape CSV field to handle special characters (semicolons, quotes, newlines)
     */
    private String escapeCsvField(String field) {
        if (field == null) {
            return "";
        }
        
        // If field contains semicolon, quote, or newline, wrap it in quotes
        if (field.contains(";") || field.contains("\"") || field.contains("\n") || field.contains("\r")) {
            // Escape existing quotes by doubling them
            String escaped = field.replace("\"", "\"\"");
            return "\"" + escaped + "\"";
        }
        
        return field;
    }
}