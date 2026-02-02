package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.repositories.CommissionRepository;
import org.example.doctoratrestapi.dtos.commission.CommissionCreationDto;
import org.example.doctoratrestapi.dtos.commission.CommissionDTO;
import org.example.doctoratrestapi.repositories.LaboratoireRepository;
import org.example.doctoratrestapi.mappers.commission.CommissionMapper;
import org.example.doctoratrestapi.models.CommissionModel;
import org.example.doctoratrestapi.models.CommissionProfesseurModel;
import org.example.doctoratrestapi.models.LaboratoireModel;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.example.doctoratrestapi.professeur.ProfesseurRepository;
import org.example.doctoratrestapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CreateCommissionService {
    private final LaboratoireRepository laboRepo;
    private final CommissionRepository commissionRepo;
    private final ProfesseurRepository profRepo;
    private final CreateCommissionProfService createCommissionProfService;
    private final CommissionMapper commissionMapper;

    public CommissionDTO addCommission(CommissionCreationDto dto){
        long userId = SecurityUtils.currentUserId();
        // vérifier que l'utilisateur est un directeur de labo => implémenter aprés
        Optional<LaboratoireModel> laboratoire =  laboRepo.findById(dto.getLaboId());
        CommissionModel commission = new CommissionModel();
        commission.setDateCommission(dto.getDateCommission());
        commission.setHeure(dto.getHeureCommission());
        commission.setLieu(dto.getLieu());
        commission.setLaboratoire(laboratoire.get());
        commissionRepo.save(commission);

        List<ProfesseurModel> professeurs = fetchAndValidateProfesseurs(dto.getMembreIds());
        List<CommissionProfesseurModel> commissionProfesseurs = createCommissionProfService.createCommissionProfesseurs(commission, professeurs);
        commission.setCommissionProfesseurs(commissionProfesseurs);
        return commissionMapper.toDto(commission);
    }
    private List<ProfesseurModel> fetchAndValidateProfesseurs(List<Long> profIds) {
        if (profIds == null || profIds.isEmpty() || profIds.size() < 3) {
            throw new IllegalArgumentException(
                    "La commission doit avoir au moins 3 professeurs"
            );
        }

        // récuperer tous les professeurs en une seul requete
        List<ProfesseurModel> professeurs = profRepo.findAllById(profIds);
        return professeurs;
    }
}

