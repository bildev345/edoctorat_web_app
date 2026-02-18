package org.example.doctoratrestapi.directeurPole;
import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.directeurPole.services.*;
import org.example.doctoratrestapi.dtos.calendrier.CalendrierPoleDto;
import org.example.doctoratrestapi.dtos.candidat.CandidatPoleDto;
import org.example.doctoratrestapi.dtos.commission.CommissionPoleDto;
import org.example.doctoratrestapi.dtos.inscription.InscriptionPoleDto;
import org.example.doctoratrestapi.dtos.resultat.ResultatPoleDto;
import org.example.doctoratrestapi.dtos.sujet.SujetPoleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.doctoratrestapi.directeurPole.services.ExportPdfService;
import java.time.LocalDateTime;
/*import com.lowagie.text.Chunk;
import com.lowagie.text.DocumentException;
import com.lowagie.text.PageSize;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
*/
import java.util.List;

@Service
@RequiredArgsConstructor
public class DirecteurPoleServiceFacadeImp implements DirecteurPoleServiceFacade {

    private final SujetPoleService sujetService;
    private final CalendrierPoleService calendrierPoleService;
    private final CommuniquerService communiquerService;
    private final CandidatPoleService candidatPoleService;
    private final CommissionPoleService commissionPoleService;
    private final InscriptionService inscriptionService;
    private final ExportPdfService exportPdfService;

    @Override
    public Page<SujetPoleDto> getSujetsPole(Pageable pageable) {
        return sujetService.getSujetsPole(pageable);
    }

    @Override
    public void publierSujets() {
        sujetService.publierSujets();
    }

    @Override
    public List<CalendrierPoleDto> getCalendrier() {
        return calendrierPoleService.getCalendrier();
    }

    @Override
    public void updateCalendrier(Long id, LocalDateTime dateDebut, LocalDateTime dateFin) {
        calendrierPoleService.updateCalendrier(id, dateDebut, dateFin);
    }

    @Override
    public void publierDecision(String decision) {
        List<Long> cedIds = communiquerService.getAllCedIds(); // 3 CED
        communiquerService.publierDecisionPourPole(decision, cedIds);
    }

    @Override
    public Page<ResultatPoleDto> getResultats(String decision, Pageable pageable) {
        List<Long> cedIds = communiquerService.getAllCedIds();
        return communiquerService.getResultatsPole(decision, cedIds, pageable);
    }
    public List<Long> getAllCedIds(){
        return communiquerService.getAllCedIds();
    }
    public Page<CandidatPoleDto> getCandidats(Pageable pageable){
        return candidatPoleService.getPostulesPole(pageable);
    }
    public Page<CommissionPoleDto> getCommissions(Pageable pageable){
        return commissionPoleService.getCommissions(pageable);
    }



    public Page<InscriptionPoleDto> getInscriptions(Pageable pageable) {
        return inscriptionService.getInscriptions(pageable);
    }


    public byte[] getRapportInscription() {
        return inscriptionService.generateRapportInscription();
    }

    public byte[] generateResultatsPdf(String decision) {
       return exportPdfService.generateResultatsPdf(decision);
    }


}

