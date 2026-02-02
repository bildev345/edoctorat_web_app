package org.example.doctoratrestapi.professeur.professeurServices;

import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionDto;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.inscription.InscriptionMapper;
import org.example.doctoratrestapi.models.InscriptionModel;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.repositories.InscriptionRepository;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InscriptionProfesseurService {

    private final InscriptionRepository inscriptionRepository;
    private final SujetRepository sujetRepository;
    private final ProfesseurRepository professeurRepository;
    private final InscriptionMapper inscriptionMapper;

    public InscriptionProfesseurService(
            InscriptionRepository inscriptionRepository,
            SujetRepository sujetRepository,
            ProfesseurRepository professeurRepository,
            InscriptionMapper inscriptionMapper
    ) {
        this.inscriptionRepository = inscriptionRepository;
        this.sujetRepository = sujetRepository;
        this.professeurRepository = professeurRepository;
        this.inscriptionMapper = inscriptionMapper;
    }


    public List<CandidatInscriptionDto> getInscriptionBySujet(Long sujetId) {

        // 1) Récupérer l'id du user connecté (userId)
        Long currentUserId = SecurityUtils.currentUserId();

        // 2) Retrouver le professeur associé à ce userId
        ProfesseurModel prof = professeurRepository.findByUserId(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable pour cet utilisateur"));

        // 3) Charger le sujet
        SujetModel sujet = sujetRepository.findById(sujetId)
                .orElseThrow(() -> new ResourceNotFoundException("Sujet introuvable"));

        // 4) Vérifier propriété du sujet
        if (sujet.getProfesseur() == null || !sujet.getProfesseur().getId().equals(prof.getId())) {
            throw new ResourceNotFoundException("Vous n’avez pas accès aux inscriptions de ce sujet");
        }

        // 5) Récupérer les inscriptions de ce sujet
        List<InscriptionModel> inscriptions = inscriptionRepository.findInscriptionModelsBySujet_Id(sujetId);

        if (inscriptions.isEmpty()) {
            throw new ResourceNotFoundException("Aucune inscription trouvée pour ce sujet");
        }

        // 6) Convertir en DTO
        return inscriptions.stream()
                .map(inscriptionMapper::toDto)
                .toList();
    }

    /**
     * Retourne toutes les inscriptions des sujets du professeur connecté.
     * 👉 Menu "Inscrits" dans le sidebar.
     */
    public List<CandidatInscriptionDto> getAllInscriptions() {

        // 1) userId du prof connecté
        Long currentUserId = SecurityUtils.currentUserId();

        // 2) Une seule query : toutes les inscriptions où sujet.professeur.user.id = currentUserId
        List<InscriptionModel> inscriptions = inscriptionRepository.findByProfUserId(currentUserId);

        if (inscriptions.isEmpty()) {
            throw new ResourceNotFoundException("Aucune inscription trouvée pour vos sujets");
        }

        // 3) Convertir en DTO
        return inscriptions.stream()
                .map(inscriptionMapper::toDto)
                .toList();
    }

    /**
     * Retourne le détail d’une inscription.
     * 🔐 Sécurité : le prof connecté doit être propriétaire du sujet lié à cette inscription.
     */
    public CandidatInscriptionDto getInscriptionById(Long inscriptionId) {

        Long currentUserId = SecurityUtils.currentUserId();

        ProfesseurModel prof = professeurRepository.findByUserId(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable pour cet utilisateur"));

        InscriptionModel inscription = inscriptionRepository.findById(inscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException("Inscription introuvable"));

        // Vérifier accès : inscription -> sujet -> professeur
        SujetModel sujet = inscription.getSujet();
        if (sujet == null || sujet.getProfesseur() == null || !sujet.getProfesseur().getId().equals(prof.getId())) {
            throw new ResourceNotFoundException("Vous n’avez pas accès à cette inscription");
        }

        return inscriptionMapper.toDto(inscription);
    }
}
