package org.example.doctoratrestapi.mappers.scolarite;

import org.example.doctoratrestapi.dtos.inscription.ScolariteInscriptionListDto;
import org.example.doctoratrestapi.models.InscriptionModel;
import org.example.doctoratrestapi.models.LaboratoireModel;
import org.springframework.stereotype.Component;

@Component
public class ScolariteInscriptionMapper {

    public ScolariteInscriptionListDto toListDto(InscriptionModel ins) {
        var c = ins.getCandidat();
        var s = ins.getSujet();

        var f = (s != null) ? s.getFormation() : null;
        var ced = (f != null) ? f.getCed() : null;

        // ✅ labo via professeur (car Sujet n'a pas laboratoire)
        LaboratoireModel labo = null;
        if (s != null && s.getProfesseur() != null) {
            labo = s.getProfesseur().getLaboratoire();
        }

        return new ScolariteInscriptionListDto(
                ins.getId(),

                c == null ? null : c.getId(),
                c == null ? null : c.getCne(),
                c == null ? null : c.getCin(),
                c == null ? null : c.getNomCandidatArabe(),
                c == null ? null : c.getPrenomCandidatArabe(),

                s == null ? null : s.getId(),
                s == null ? null : s.getTitre(),

                f == null ? null : f.getId(),
                f == null ? null : f.getTitre(),

                ced == null ? null : ced.getId(),
                ced == null ? null : ced.getTitre(),

                labo == null ? null : labo.getId(),
                labo == null ? null : labo.getNomLaboratoire(), // ✅ ATTENTION: LaboratoireModel a nomLaboratoire
                // si tu as aussi "titre" dans labo, change ici

                ins.getDateDeposerDossier(),
                ins.getRemarque(),
                ins.getValider()
        );
    }
}
