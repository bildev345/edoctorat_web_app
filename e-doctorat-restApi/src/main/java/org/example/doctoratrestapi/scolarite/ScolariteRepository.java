package org.example.doctoratrestapi.scolarite;

import org.example.doctoratrestapi.models.InscriptionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScolariteRepository extends JpaRepository<InscriptionModel, Long> {

    @Query("""
        select ins from InscriptionModel ins
        left join fetch ins.candidat c
        left join fetch ins.sujet s
        left join fetch s.formation f
        left join fetch f.ced ced
        left join fetch s.professeur p
        left join fetch p.laboratoire labo
    """)
    List<InscriptionModel> findAllWithDetails();

    boolean existsByCandidatIdAndSujetId(Long candidatId, Long sujetId);


}
