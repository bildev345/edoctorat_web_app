package org.example.doctoratrestapi.mappers.inscription;
import org.example.doctoratrestapi.models.InscriptionModel;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionCreationDto;
import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionDto;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component


public class InscriptionMapper {

    public CandidatInscriptionDto toDto(InscriptionModel inscriptionModel) {
        LocalDate dateDeposerDossier = inscriptionModel.getDateDeposerDossier();
        String remarque = inscriptionModel.getRemarque();
        Boolean valider = inscriptionModel.getValider();
        String cne = inscriptionModel.getCandidat().getCne();
        String cin = inscriptionModel.getCandidat().getCin();
        String nomCandidatArabe = inscriptionModel.getCandidat().getNomCandidatArabe();
        String prenomCandidatArabe = inscriptionModel.getCandidat().getPrenomCandidatArabe();
        String titre = inscriptionModel.getSujet().getTitre();
        String description = inscriptionModel.getSujet().getDescription();
        boolean publier = inscriptionModel.getSujet().isPublier();
        return new CandidatInscriptionDto(cne, cin, nomCandidatArabe, prenomCandidatArabe,
                dateDeposerDossier, remarque, valider, titre, description
                );
    }
    // convertir le DTO en Inscription
    public InscriptionModel toInscription(CandidatInscriptionCreationDto dtoCreation, CandidatModel candidat, SujetModel sujet){
        InscriptionModel inscription = new InscriptionModel();
        inscription.setCandidat(candidat);
        inscription.setSujet(sujet);
        inscription.setDateDeposerDossier(dtoCreation.getDateDeposerDossier());
        inscription.setValider(false);
        return inscription;
    }
}
