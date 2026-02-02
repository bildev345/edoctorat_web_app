package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.EtablissementModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtablissementRepository extends JpaRepository<EtablissementModel, Long> {
    //List<EtablissementModel> findByCed(CedModel ced);
}
