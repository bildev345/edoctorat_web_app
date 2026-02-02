package org.example.doctoratrestapi.dtos.inscription;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ScolariteInscriptionUpdateDto {
    private LocalDate dateDeposerDossier;
    private String remarque;
    private Boolean valider; // ✅ validation via PUT (plus de PATCH)
}
