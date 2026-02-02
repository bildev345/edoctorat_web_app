package org.example.doctoratrestapi.candidat;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.candidat.candidatServices.CandidatDiplomeService;
import org.example.doctoratrestapi.candidat.candidatServices.CandidatPostulerService;
import org.example.doctoratrestapi.candidat.candidatServices.CandidatService;
import org.example.doctoratrestapi.directeurCed.CedRepository;
import org.example.doctoratrestapi.dtos.NotificationDto;
import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.dtos.common.SelectOptionDto;
import org.example.doctoratrestapi.dtos.diplome.DiplomeDto;
import org.example.doctoratrestapi.dtos.postuler.CandidatureDtoResponse;
import org.example.doctoratrestapi.dtos.postuler.PostulerDto;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoResponse;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.DiplomeModel;
import org.example.doctoratrestapi.models.PaysModel;
import org.example.doctoratrestapi.models.PostulerModel;
import org.example.doctoratrestapi.repositories.*;
import org.example.doctoratrestapi.user.UserModel;
import org.example.doctoratrestapi.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidatServiceFacadeImp implements CandidatServiceFacade {

    private final CandidatService candidatService;
    private final CandidatDiplomeService diplomeService;
    private final CandidatPostulerService postulerService;
    private final CandidatRepository candidatRepository;
    private final PostulerRepository postulerRepository;
    private final NotificationRepository notificationRepository;

    // Repositories nécessaires
    private final CedRepository cedRepository;
    private final LaboratoireRepository laboratoireRepository;
    private final FormationDoctoraleRepository formationRepository;
    private final SujetRepository sujetRepository;
    private final PaysRepository paysRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public CandidatModel saveCandidatInfo(CandidatDto dto, String email) {
        // 1. Récupérer l'utilisateur correspondant au Token
        UserModel user = userRepository.findByUsername(email)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));

        // 2. Vérifier si un candidat existe déjà pour cet utilisateur (Mode Update)
        // Sinon, créer une nouvelle instance (Mode Create)
        CandidatModel candidat = candidatRepository.findByUser_Username(email)
                .orElse(new CandidatModel());

        // 3. Mapper les données du DTO vers l'entité
        candidat.setCne(dto.getCne());
        candidat.setCin(dto.getCin());
        candidat.setNom(dto.getNom());
        candidat.setPrenom(dto.getPrenom());
        candidat.setNomCandidatArabe(dto.getNomArabe());
        candidat.setPrenomCandidatArabe(dto.getPrenomArabe());
        candidat.setAdresse(dto.getAdresse());
        candidat.setAdresseArabe(dto.getAdresseArabe());
        candidat.setSexe(dto.getSexe());
        candidat.setVilleDeNaissance(dto.getVilleDeNaissance());
        candidat.setVilleDeNaissanceArabe(dto.getVilleDeNaissanceArabe());
        candidat.setVille(dto.getVille());
        candidat.setDateDeNaissance(dto.getDateDeNaissance());
        candidat.setTypeDeHandicape(dto.getTypeDeHandicape());
        candidat.setAcademie(dto.getAcademie());
        candidat.setTelCandidat(dto.getTelCandidat());
        candidat.setSituationFamiliale(dto.getSituationFamiliale());
        candidat.setFonctionaire(dto.isFonctionaire());

        // 4. Gérer la relation avec le Pays (via ID du DTO)
        if (dto.getPaysId() != null) {
            PaysModel pays = paysRepository.findById(dto.getPaysId()).orElse(null);
            candidat.setPays(pays);
        }

        // 5. L'ÉTAPE CRUCIALE : Lier l'utilisateur au candidat
        candidat.setUser(user);

        // 6. Sauvegarder l'entité
        return candidatRepository.save(candidat);
    }

    @Override
    public DiplomeModel addDiplome(Long id, DiplomeDto dto) {
        return diplomeService.addDiplome(id, dto);
    }

    @Override
    public PostulerModel postulerAuSujet(Long id, PostulerDto dto) {
        CandidatModel candidat = candidatRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Candidat non trouvé"));

        if (candidat.isDossierValide()) {
            throw new IllegalStateException("Dossier validé : vous ne pouvez plus postuler.");
        }

        return postulerService.postulerAuSujet(id, dto);
    }



    @Override
    public CandidatModel getCandidatById(Long id) {
        return candidatRepository.findById(id).orElse(null);
    }

    @Override
    public List<PaysModel> getAllPays() {
        return paysRepository.findAll();
    }

    // --- NOUVELLE LOGIQUE DE FILTRAGE ---

    @Override
    public List<SelectOptionDto> getLaboratoires(Long cedId) {
        return laboratoireRepository.findAll().stream()
                .filter(l -> cedId == null || (l.getCed() != null && l.getCed().getId().equals(cedId)))
                .map(l -> new SelectOptionDto(l.getId(), l.getNomLaboratoire()))
                .collect(Collectors.toList());
    }

    @Override
    public List<SelectOptionDto> getFormations(Long cedId) {
        return formationRepository.findAll().stream()
                .filter(f -> cedId == null || (f.getCed() != null && f.getCed().getId().equals(cedId)))
                .map(f -> new SelectOptionDto(f.getId(), f.getTitre()))
                .collect(Collectors.toList());
    }

    @Override
    public List<SujetDtoResponse> searchSujets(Long cedId, Long labId, Long formationId) {
        return sujetRepository.findAll().stream()
                .filter(s -> {
                    boolean matchCed = (cedId == null) ||
                            (s.getFormation() != null && s.getFormation().getCed() != null && s.getFormation().getCed().getId().equals(cedId));

                    boolean matchFormation = (formationId == null) ||
                            (s.getFormation() != null && s.getFormation().getId().equals(formationId));

                    boolean matchLab = (labId == null) ||
                            (s.getProfesseur() != null && s.getProfesseur().getLaboratoire() != null && s.getProfesseur().getLaboratoire().getId().equals(labId));

                    return matchCed && matchFormation && matchLab && s.isPublier();
                })
                .map(s -> SujetDtoResponse.builder()
                        .id(s.getId())
                        .titre(s.getTitre())
                        .description(s.getDescription())
                        .profNom(s.getProfesseur() != null && s.getProfesseur().getUser() != null ?
                                "Pr. " + s.getProfesseur().getUser().getLastName() + " " + s.getProfesseur().getUser().getFirstName() : "Non assigné")
                        .labNom(s.getProfesseur() != null && s.getProfesseur().getLaboratoire() != null ?
                                s.getProfesseur().getLaboratoire().getNomLaboratoire() : "")
                        .cedocNom(s.getFormation() != null && s.getFormation().getCed() != null ?
                                s.getFormation().getCed().getTitre() : "")
                        .formationNom(s.getFormation() != null ? s.getFormation().getTitre() : "")
                        .etablissementNom(s.getFormation() != null && s.getFormation().getEtablissement() != null ?
                                s.getFormation().getEtablissement().getNomEtablissement() : "Non spécifié")
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<SelectOptionDto> getAllCeds() {
        return cedRepository.findAll().stream()
                .map(ced -> new SelectOptionDto(ced.getId(), ced.getTitre()))
                .collect(Collectors.toList());
    }

    @Override
    public List<CandidatureDtoResponse> getCandidatures(Long candidatId) {
        // 1. Utilisation de la méthode native du Repository (Plus de stream().filter() fragile)
        List<PostulerModel> candidatures = postulerRepository.findByCandidatModel_Id(candidatId);

        // 2. Mapping des résultats
        return candidatures.stream()
                .map(p -> {
                    var s = p.getSujetModel();

                    // Sécurisation des données nulles pour éviter les crashs
                    String nomProf = "Inconnu";
                    String nomLab = "Non spécifié";
                    String nomCed = "Non spécifié";

                    if (s != null) {
                        if (s.getProfesseur() != null && s.getProfesseur().getUser() != null) {
                            nomProf = "Pr. " + s.getProfesseur().getUser().getFirstName() + " " + s.getProfesseur().getUser().getLastName();
                        }
                        if (s.getProfesseur() != null && s.getProfesseur().getLaboratoire() != null) {
                            nomLab = s.getProfesseur().getLaboratoire().getNomLaboratoire();
                        }
                        if (s.getFormation() != null && s.getFormation().getCed() != null) {
                            nomCed = s.getFormation().getCed().getTitre();
                        }
                    }

                    return CandidatureDtoResponse.builder()
                            .id(p.getId())
                            .titre(s != null ? s.getTitre() : "Sujet Introuvable")
                            .description(s != null ? s.getDescription() : "")
                            .prof(nomProf)
                            .lab(nomLab)
                            .cedoc(nomCed)
                            .etat("EN_ATTENTE") // Vous pourrez changer ça plus tard
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional // Important pour la suppression
    public void removeCandidature(Long candidatId, Long sujetId) {
        CandidatModel candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new EntityNotFoundException("Candidat non trouvé"));

        if (candidat.isDossierValide()) {
            throw new IllegalStateException("Dossier validé : vous ne pouvez plus modifier vos candidatures.");
        }

        postulerRepository.deleteByCandidatModel_IdAndSujetModel_Id(candidatId, sujetId);
    }


    public CandidatModel getCandidatByEmail(String email) {
        // Retourner null au lieu de jeter une exception pour que le contrôleur
        // puisse répondre un objet vide (200 OK) au lieu d'une erreur 500
        return candidatRepository.findByUser_Username(email).orElse(null);
    }
    // CandidatServiceFacadeImp.java

    @Override
    public List<DiplomeModel> getDiplomes(Long candidatId) {
        CandidatModel candidat = candidatRepository.findById(candidatId).orElse(null);
        // Retourne toujours une liste vide au lieu de null pour éviter l'erreur .map()
        return (candidat != null && candidat.getDiplomes() != null) ? candidat.getDiplomes() : new ArrayList<>();
    }

    @Transactional
    public CandidatModel updateCandidatInfo(CandidatDto dto, MultipartFile photo, String email) {
        CandidatModel candidat = candidatRepository.findByUser_Username(email)
                .orElseThrow(() -> new EntityNotFoundException("Candidat non trouvé"));

        // --- IDENTITÉ (FRANÇAIS) ---
        candidat.setNom(dto.getNom());
        candidat.setPrenom(dto.getPrenom());
        candidat.setCin(dto.getCin());
        candidat.setCne(dto.getCne());

        // --- IDENTITÉ (ARABE) ---
        candidat.setNomCandidatArabe(dto.getNomArabe());
        candidat.setPrenomCandidatArabe(dto.getPrenomArabe());

        // --- ÉTAT CIVIL & NAISSANCE ---
        candidat.setSexe(dto.getSexe());
        candidat.setDateDeNaissance(dto.getDateDeNaissance());
        candidat.setSituationFamiliale(dto.getSituationFamiliale());
        candidat.setVilleDeNaissance(dto.getVilleDeNaissance());
        candidat.setVilleDeNaissanceArabe(dto.getVilleDeNaissanceArabe());

        // --- COORDONNÉES ---
        candidat.setTelCandidat(dto.getTelCandidat());
        candidat.setAdresse(dto.getAdresse());
        candidat.setAdresseArabe(dto.getAdresseArabe());
        candidat.setVille(dto.getVille());
        candidat.setAcademie(dto.getAcademie());

        // --- SITUATION PROFESSIONNELLE & HANDICAP ---
        candidat.setTypeDeHandicape(dto.getTypeDeHandicape());

        // --- PAYS (Gestion de l'objet lié) ---
        // Si votre DTO contient un paysId, vous devez charger l'entité Pays
        if (dto.getPaysId() != null) {
            PaysModel pays = paysRepository.findById(dto.getPaysId()).orElse(null);
            candidat.setPays(pays);
        }

        // --- GESTION DE LA PHOTO ---
//        if (photo != null && !photo.isEmpty()) {
//            // Logique de sauvegarde de fichier (voir réponse précédente)
//            String fileName = saveFile(photo, "photos");
//            candidat.setPathPhoto(fileName);
//        }

        return candidatRepository.save(candidat);
    }
    @Override
    @Transactional
    public void validerDossier(Long candidatId) {
        CandidatModel candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new EntityNotFoundException("Candidat non trouvé"));

        candidat.setDossierValide(true);
        candidatRepository.save(candidat);
    }
    // Dans CandidatServiceFacadeImp.java
    @Override
    public List<NotificationDto> getMyNotifications(String email) {
        CandidatModel c = getCandidatByEmail(email);

        return notificationRepository.findByCandidatIdOrderByIdDesc(c.getId())
                .stream()
                .map(n -> {
                    NotificationDto dto = new NotificationDto();
                    dto.id = n.getId();
                    dto.type = n.getType();

                    if (n.getSujet() != null) {
                        dto.sujetId = n.getSujet().getId();
                        dto.sujetTitre = n.getSujet().getTitre();
                    }
                    if (n.getCommission() != null) {
                        dto.commissionId = n.getCommission().getId();
                    }
                    return dto;
                })
                .toList();
    }

}