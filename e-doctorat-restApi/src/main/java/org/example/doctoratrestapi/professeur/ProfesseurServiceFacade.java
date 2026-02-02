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
import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoCreation;

import java.util.List;

public interface ProfesseurServiceFacade {


    List<CandidatProfListDto> selectCandidatsByProfesseur();

    CandidatProfDetailDto getCandidatById(long id);

    List<CommissionDTO> getCommissionsByProfesseur();


    List<CandidatInscriptionDto> getInscriptionBySujet(Long sujetId);

    List<CandidatInscriptionDto> getAllInscriptions();

    CandidatInscriptionDto getInscriptionById(Long id);

    SujetDTO addSujet(SujetDtoCreation sujetDtoCreation);

    void deleteSujet(Long sujetId);

    List<SujetDTO> getSujetsByProfesseur();

    SujetDTO getSujetById(Long sujetId);

    SujetDTO updateSujet(Long sujetId, SujetDtoCreation sujetDtoCreation);

    List<SujetDTO> getSujetsByCommission(Long commissionId);

    List<CommissionCandidatListDto> getCandidatsByCommissionSujet(Long commissionId, Long sujetId);

    byte[] generatePvPdf(Long commissionId, Long sujetId);

    List<ResultatProfDto> getResultats();

    ExaminationDTO getExamination(Long commissionId, Long sujetId, Long candidatId);

    ExaminationDTO createExamination(Long commissionId, Long sujetId, Long candidatId, ExaminationCreationDTO dto);

    ExaminationDTO updateExamination(Long commissionId, Long sujetId, Long candidatId, ExaminationCreationDTO dto);

}
