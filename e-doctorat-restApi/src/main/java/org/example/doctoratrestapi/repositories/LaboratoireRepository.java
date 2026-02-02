package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.LaboratoireModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LaboratoireRepository extends JpaRepository<LaboratoireModel, Long> {

    List<LaboratoireModel> findByCed_Id(Long cedId);

    // Dir Pôle voit labos établissement
    List<LaboratoireModel> findByEtablissement_Id(Long etablissementId);
}
