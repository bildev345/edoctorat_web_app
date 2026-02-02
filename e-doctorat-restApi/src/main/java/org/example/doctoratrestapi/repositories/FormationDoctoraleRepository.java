package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.FormationDoctoraleModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationDoctoraleRepository extends JpaRepository<FormationDoctoraleModel, Long> {

    //List<FormationDoctoraleModel> findByCed(CedModel ced);
    //List<FormationDoctoraleModel> findByEtablissement(EtablissementModel etablissement);
}
