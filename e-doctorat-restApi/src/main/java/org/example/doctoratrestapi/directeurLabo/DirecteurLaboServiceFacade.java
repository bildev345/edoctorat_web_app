package org.example.doctoratrestapi.directeurLabo;

import org.example.doctoratrestapi.dtos.common.PageResponseDto;
import org.example.doctoratrestapi.dtos.examination.ResultatExaminationDto;
import org.example.doctoratrestapi.dtos.formationDoctorale.FormationDtoLabo;
import org.example.doctoratrestapi.dtos.postuler.CandidatPostulesDto;
import org.example.doctoratrestapi.dtos.commission.CommissionCreationDto;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionDto;
import org.example.doctoratrestapi.dtos.notification.NotificationBulkCreationDto;
import org.example.doctoratrestapi.dtos.professeur.ProfesseurLaboDto;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDto;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoCreation;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDtoCreation;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface DirecteurLaboServiceFacade {
    Page<CandidatPostulesDto> getCandidatsByLabo(Pageable pageable);
    //public List<SujetLaboDto> getSujetsByLabo();
    PageResponseDto<SujetLaboDto> getSujetsByLabo(Pageable pageable);
    List<SujetModel> getSujetsByLabo();
    void addSujet(SujetLaboDtoCreation sujetDto);
    Page<ResultatExaminationDto> getResultatExaminations(Pageable pageable);

    Page<CandidatInscriptionDto> getCandidatsInscritsByLabo(Pageable pageable);
    CommissionDTO addCommission(CommissionCreationDto dto);
    void addNotifications(NotificationBulkCreationDto dto);

    Page<CommissionDTO> getCommissionsByLabo(int page, int size);
    List<ProfesseurLaboDto> selectProfs();
    List<FormationDtoLabo> selectFormations();
//    public void uploaderSujetsCsv();
//    public void telechargerPVGlobal();

}
