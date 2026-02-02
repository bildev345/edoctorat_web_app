package org.example.doctoratrestapi.candidat;

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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CandidatServiceFacade {

    // --- EXISTANT ---
    CandidatModel saveCandidatInfo(CandidatDto dto, String email);
    DiplomeModel addDiplome(Long candidatId, DiplomeDto dto);
    PostulerModel postulerAuSujet(Long candidatId, PostulerDto dto);
    CandidatModel getCandidatById(Long candidatId);
    List<PaysModel> getAllPays();

    // --- NOUVEAU FILTRAGE (CED -> LABO -> FORMATION) ---

    // 1. Liste des CEDs (Niveau 1)
    List<SelectOptionDto> getAllCeds();

    // 2. Liste des Labos filtrés par CED (Niveau 2)
    List<SelectOptionDto> getLaboratoires(Long cedId);

    // 3. Liste des Formations filtrées par CED (Niveau 3)
    List<SelectOptionDto> getFormations(Long cedId);

    // 4. Recherche finale
    List<SujetDtoResponse> searchSujets(Long cedId, Long labId, Long formationId);
    // Dans CandidatServiceFacade.java
    List<CandidatureDtoResponse> getCandidatures(Long candidatId);
    // Ajoutez cette ligne
    void removeCandidature(Long candidatId, Long sujetId);
    List<DiplomeModel> getDiplomes(Long candidatId);
    CandidatModel getCandidatByEmail(String email);
    CandidatModel updateCandidatInfo(CandidatDto dto, MultipartFile photo, String email);
    void validerDossier(Long candidatId);
    // Dans CandidatServiceFacade.java
    List<NotificationDto> getMyNotifications(String email);


}