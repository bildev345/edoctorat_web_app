package org.example.doctoratrestapi.directeurLabo;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.directeurLabo.directeurLaboServices.*;
import org.example.doctoratrestapi.dtos.candidat.CandidatDto;
import org.example.doctoratrestapi.dtos.commission.CommissionCreationDto;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.dtos.common.PageResponseDto;
import org.example.doctoratrestapi.dtos.examination.ExaminationDTO;
import org.example.doctoratrestapi.dtos.examination.ResultatExaminationDto;
import org.example.doctoratrestapi.dtos.formationDoctorale.FormationDtoLabo;
import org.example.doctoratrestapi.dtos.inscription.CandidatInscriptionDto;
import org.example.doctoratrestapi.dtos.notification.NotificationBulkCreationDto;
import org.example.doctoratrestapi.dtos.postuler.CandidatPostulesDto;
import org.example.doctoratrestapi.dtos.professeur.ProfesseurLaboDto;
import org.example.doctoratrestapi.dtos.sujet.SujetDTO;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDto;
import org.example.doctoratrestapi.dtos.sujet.SujetDtoCreation;
import org.example.doctoratrestapi.dtos.sujet.SujetLaboDtoCreation;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
@RequiredArgsConstructor
@Service
public class DirecteurLaboServiceFacadeImp implements DirecteurLaboServiceFacade{
    private final ViewCandidatsService viewCandidatsService;
    private final SujetManagementService sujetService;
    private final ViewExaminationsService viewExaminationsService;
    private final ViewCandidatsInscritsService viewCandidatsInscritsService;
    private final CreateCommissionService createCommissionService;
    private final CreateNotificationsService createNotificationsService;
    private final ViewLaboCommissionsService viewLaboCommissionsService;
    private final ProfService profService;
    private final FormationService formationService;

    public Page<CandidatPostulesDto> getCandidatsByLabo(Pageable pageable){
        return viewCandidatsService.selectCandidatsByLabo(pageable);

    }
    public PageResponseDto<SujetLaboDto> getSujetsByLabo(Pageable pageable) {
        return sujetService.selectSujetsByLabo(pageable);
    }

    /*public List<SujetLaboDto> getSujetsByLabo(){
       return sujetService.selectSujetsByLabo();
    }*/
    public void addSujet(SujetLaboDtoCreation sujetDto){
       sujetService.addSujet(sujetDto);
    }
    public Page<ResultatExaminationDto> getResultatExaminations(Pageable pageable) {
        return viewExaminationsService.selectExaminationsByLabo(pageable);
    }
    public Page<CandidatInscriptionDto> getCandidatsInscritsByLabo(Pageable pageable){
        return viewCandidatsInscritsService.selectCandidatsInscritsByLabo(pageable);
    }
    public CommissionDTO addCommission(CommissionCreationDto dto){
        return createCommissionService.addCommission(dto);
    }
    public void addNotifications(NotificationBulkCreationDto dto){
        createNotificationsService.createBulkNotifications(dto);
    }
    public Page<CommissionDTO> getCommissionsByLabo(int page, int size){
       return  viewLaboCommissionsService.getCommissionsByLabo(page, size);
    }
    public List<ProfesseurLaboDto> selectProfs(){
        return profService.selectProfs();
    };
    public List<FormationDtoLabo> selectFormations(){
        return formationService.selectFormations();
    }
    public List<SujetModel> getSujetsByLabo(){
        return sujetService.selectSujetsByLabo();
    }



//    public void uploaderSujetsCsv();
//    public void telechargerPVGlobal();

}
