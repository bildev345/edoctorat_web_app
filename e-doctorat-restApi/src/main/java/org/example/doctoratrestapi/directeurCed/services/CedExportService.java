package org.example.doctoratrestapi.directeurCed.services;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.doctoratrestapi.dtos.ced.InscriptionCedDto;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class CedExportService {

    public ByteArrayInputStream exportInscriptionsToExcel(List<InscriptionCedDto> inscriptions) throws IOException {
        String[] columns = {"CNE", "Nom Complet", "Formation Doctorale", "Sujet de Recherche", "Date de Dépôt", "Statut"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Inscriptions Finales");

            // Font dyal l-Header
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            // Style dyal l-Header
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            headerCellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            // Row dyal l-Header
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
                cell.setCellStyle(headerCellStyle);
            }

            // Remplissage dyal les données
            int rowIdx = 1;
            for (InscriptionCedDto ins : inscriptions) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(ins.cne());
                row.createCell(1).setCellValue(ins.nomComplet());
                row.createCell(2).setCellValue(ins.formationTitre());
                row.createCell(3).setCellValue(ins.sujetTitre());
                row.createCell(4).setCellValue(ins.dateDepot());
                row.createCell(5).setCellValue(ins.estValide() != null && ins.estValide() ? "Validé" : "En attente");
            }

            // Auto-size columns bach yji dda9 dda9
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}