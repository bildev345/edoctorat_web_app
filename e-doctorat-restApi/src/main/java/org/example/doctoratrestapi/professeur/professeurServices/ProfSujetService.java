package org.example.doctoratrestapi.professeur.professeurServices;

import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoCreation;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.mappers.sujet.SujetMapper;
import org.example.doctoratrestapi.models.FormationDoctoraleModel;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.repositories.FormationDoctoraleRepository;
import org.example.doctoratrestapi.repositories.SujetRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfSujetService {

    private final FormationDoctoraleRepository formationRep;
    private final SujetRepository sujetRep;
    private final ProfesseurRepository profRep;
    private final SujetMapper mapper;

    public ProfSujetService(
            FormationDoctoraleRepository formationRep,
            SujetRepository sujetRep,
            ProfesseurRepository profRep,
            SujetMapper mapper
    ) {
        this.formationRep = formationRep;
        this.sujetRep = sujetRep;
        this.profRep = profRep;
        this.mapper = mapper;
    }


    public SujetDTO addSujet(SujetDtoCreation dto) {

        Long currentUserId = SecurityUtils.currentUserId();

        ProfesseurModel prof = profRep.findByUserId(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Professeur introuvable pour cet utilisateur"));

        if (dto.getFormationDoctoralId() == null) {
            throw new ResourceNotFoundException("Formation doctorale obligatoire");
        }

        FormationDoctoraleModel formation = formationRep.findById(dto.getFormationDoctoralId())
                .orElseThrow(() -> new ResourceNotFoundException("Formation doctorale introuvable"));

        //  coDirecteur optionnel
        ProfesseurModel coDirecteur = null;
        if (dto.getCoDirecteurId() != null) {
            coDirecteur = profRep.findById(dto.getCoDirecteurId())
                    .orElseThrow(() -> new ResourceNotFoundException("Co-directeur introuvable"));
        }

        SujetModel sujet = mapper.toSujet(dto, formation, coDirecteur);
        sujet.setProfesseur(prof);

        SujetModel created = sujetRep.save(sujet);
        return mapper.toDTO(created);
    }


    /**
     * ✅ Prof récupère tous SES sujets.
     * 🔐 Sécurité : on filtre via userId du prof (pas de professeurId côté front).
     */
    public List<SujetDTO> getSujetsByProfesseur() {
        Long currentUserId = SecurityUtils.currentUserId();

        List<SujetModel> sujets = sujetRep.findByProfUserId(currentUserId);
        if (sujets.isEmpty()) {
            throw new ResourceNotFoundException("Aucun sujet trouvé");
        }

        return sujets.stream().map(mapper::toDTO).toList();
    }

    /**
     * ✅ Détail d’un sujet (uniquement si appartient au prof connecté).
     */
    public SujetDTO getSujetById(Long sujetId) {

        Long currentUserId = SecurityUtils.currentUserId();

        // ownership check rapide
        if (!sujetRep.existsByIdAndProfUserId(sujetId, currentUserId)) {
            throw new ResourceNotFoundException("Vous n'avez pas accès à ce sujet");
        }

        SujetModel sujet = sujetRep.findById(sujetId)
                .orElseThrow(() -> new ResourceNotFoundException("Sujet introuvable"));

        return mapper.toDTO(sujet);
    }

    /**
     * ✅ Update sujet (uniquement si appartient au prof connecté).
     */
    public SujetDTO updateSujet(Long sujetId, SujetDtoCreation dto) {

        Long currentUserId = SecurityUtils.currentUserId();

        if (!sujetRep.existsByIdAndProfUserId(sujetId, currentUserId)) {
            throw new ResourceNotFoundException("Vous n'avez pas accès à ce sujet");
        }

        SujetModel sujet = sujetRep.findById(sujetId)
                .orElseThrow(() -> new ResourceNotFoundException("Sujet introuvable"));

        sujet.setTitre(dto.getTitre());
        sujet.setDescription(dto.getDescription());
        sujet.setPublier(dto.isPublier());

        // ✅ formation change
        if (dto.getFormationDoctoralId() != null) {
            FormationDoctoraleModel formation = formationRep.findById(dto.getFormationDoctoralId())
                    .orElseThrow(() -> new ResourceNotFoundException("Formation doctorale introuvable"));
            sujet.setFormation(formation);
        }

        // ✅ co-directeur change (optionnel)
        if (dto.getCoDirecteurId() != null) {
            ProfesseurModel coDirecteur = profRep.findById(dto.getCoDirecteurId())
                    .orElseThrow(() -> new ResourceNotFoundException("Co-directeur introuvable"));
            sujet.setCoDirecteur(coDirecteur);
        } else {
            // si tu veux permettre “supprimer le co-directeur”
            sujet.setCoDirecteur(null);
        }

        SujetModel updated = sujetRep.save(sujet);
        return mapper.toDTO(updated);
    }


    /**
     * ✅ Delete sujet (uniquement si appartient au prof connecté).
     */
    public void deleteSujet(Long sujetId) {

        Long currentUserId = SecurityUtils.currentUserId();

        if (!sujetRep.existsByIdAndProfUserId(sujetId, currentUserId)) {
            throw new ResourceNotFoundException("Vous n'avez pas accès à ce sujet");
        }

        SujetModel sujet = sujetRep.findById(sujetId)
                .orElseThrow(() -> new ResourceNotFoundException("Sujet introuvable"));

        sujetRep.delete(sujet);
    }
}
