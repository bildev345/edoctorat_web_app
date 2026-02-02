package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.AnnexeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnnexeRepository extends JpaRepository<AnnexeModel,Long> {


    @Query("select a from AnnexeModel a join a.diplome d where d.candidat.id = :candidatId")
    AnnexeModel getAnnexeByCandidatId(@Param("candidatId") Long candidatId);

    List<AnnexeModel> findByDiplome_Id(Long diplomeId);

        @Query("""
        select a
        from AnnexeModel a
        join fetch a.diplome d
        where d.candidat.id = :candidatId
    """)
        List<AnnexeModel> findByCandidatId(@Param("candidatId") Long candidatId);
    }



