package org.example.doctoratrestapi.professeur;

import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.dtos.examination.ExaminationCreationDTO;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionDto;
import org.example.doctoratrestapi.dtos.professeur.CandidatProfDetailDto;
import org.example.doctoratrestapi.dtos.professeur.CandidatProfListDto;
import org.example.doctoratrestapi.dtos.professeur.CommissionCandidatListDto;
import org.example.doctoratrestapi.dtos.professeur.ResultatProfDto;
import org.example.doctoratrestapi.professeur.professeurServices.*;
import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoCreation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ProfesseurServiceFacadeImp implements ProfesseurServiceFacade {

    private final CandidatProfesseurService candidatProfesseurService;
    private final CommissionProfService commissionProfService;
    private final ProfExaminerService profExaminerService;
    private final InscriptionProfesseurService inscriptionService;
    private final ProfResultatService resultatService;


    private final ProfSujetService sujetService;

    public ProfesseurServiceFacadeImp(
            CandidatProfesseurService candidatProfesseurService,
            CommissionProfService commissionProfService,
            ProfExaminerService profExaminerService,
            InscriptionProfesseurService inscriptionService,
            ProfSujetService sujetService,ProfResultatService resultatService
    ) {
        this.candidatProfesseurService = candidatProfesseurService;
        this.commissionProfService = commissionProfService;
        this.profExaminerService = profExaminerService;
        this.inscriptionService = inscriptionService;
        this.sujetService = sujetService;
        this.resultatService =resultatService;
    }

    @Override
    public List<CandidatProfListDto> selectCandidatsByProfesseur() {
        return candidatProfesseurService.selectCandidatsByProfesseur();
    }

    @Override
    public CandidatProfDetailDto getCandidatById(long id) {
        return candidatProfesseurService.getCandidatById(id);
    }


    @Override
    public List<CommissionDTO> getCommissionsByProfesseur() {
        return commissionProfService.getCommissionsByProfesseur();
    }


    @Override
    public List<CandidatInscriptionDto> getInscriptionBySujet(Long sujetId) {
        return inscriptionService.getInscriptionBySujet(sujetId);
    }

    @Override
    public List<CandidatInscriptionDto> getAllInscriptions() {
        return inscriptionService.getAllInscriptions();
    }

    @Override
    public CandidatInscriptionDto getInscriptionById(Long id) {
        return inscriptionService.getInscriptionById(id);
    }

    @Override
    public SujetDTO addSujet(SujetDtoCreation sujetDtoCreation) {
        return sujetService.addSujet(sujetDtoCreation);
    }

    @Override
    public void deleteSujet(Long sujetId) {
        sujetService.deleteSujet(sujetId);
    }

    @Override
    public List<SujetDTO> getSujetsByProfesseur() {
        return sujetService.getSujetsByProfesseur();
    }

    @Override
    public SujetDTO getSujetById(Long sujetId) {
        return sujetService.getSujetById(sujetId);
    }

    @Override
    public SujetDTO updateSujet(Long sujetId, SujetDtoCreation sujetDtoCreation) {
        return sujetService.updateSujet(sujetId, sujetDtoCreation);
    }
    @Override
    public List<SujetDTO> getSujetsByCommission(Long commissionId) {
        return commissionProfService.getSujetsByCommission(commissionId);
    }

    @Override
    public List<CommissionCandidatListDto> getCandidatsByCommissionSujet(Long commissionId, Long sujetId) {
        return commissionProfService.getCandidatsByCommissionSujet(commissionId, sujetId);
    }

    @Override
    public byte[] generatePvPdf(Long commissionId, Long sujetId) {
        return commissionProfService.generatePvPdf(commissionId, sujetId);
    }
    @Override
    public ExaminationDTO getExamination(Long commissionId, Long sujetId, Long candidatId) {
        return profExaminerService.getExamination(commissionId, sujetId, candidatId);
    }

    @Override
    public ExaminationDTO createExamination(Long commissionId, Long sujetId, Long candidatId, ExaminationCreationDTO dto) {
        return profExaminerService.createExamination(commissionId, sujetId, candidatId, dto);
    }

    @Override
    public ExaminationDTO updateExamination(Long commissionId, Long sujetId, Long candidatId, ExaminationCreationDTO dto) {
        return profExaminerService.updateExamination(commissionId, sujetId, candidatId, dto);
    }


    @Override
    public List<ResultatProfDto> getResultats() {
        return resultatService.getResultats();
    }

}
