package org.example.doctoratrestapi.directeurLabo.directeurLaboServices;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.repositories.CommissionProfesseurRepository;
import org.example.doctoratrestapi.models.CommissionModel;
import org.example.doctoratrestapi.models.CommissionProfesseurModel;
import org.example.doctoratrestapi.models.ProfesseurModel;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CreateCommissionProfService {
    private final CommissionProfesseurRepository commissionProfesseurRepo;
    public List<CommissionProfesseurModel> createCommissionProfesseurs(CommissionModel commission, List<ProfesseurModel> professeurs){
        List<CommissionProfesseurModel> commissionProfesseurs = professeurs.stream()
                .map(professeur -> {
                    CommissionProfesseurModel cp = new CommissionProfesseurModel();
                    cp.setCommission(commission);
                    cp.setProfesseur(professeur);
                    return cp;
                })
                .toList();

        return commissionProfesseurRepo.saveAll(commissionProfesseurs);
    }
}
