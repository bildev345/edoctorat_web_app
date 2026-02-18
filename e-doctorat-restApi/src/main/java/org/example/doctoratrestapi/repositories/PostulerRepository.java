package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.dtos.postuler.CandidatPostulesDto;
import org.example.doctoratrestapi.models.CandidatModel;
import org.example.doctoratrestapi.models.PostulerModel;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostulerRepository extends JpaRepository<PostulerModel, Long> {
    // Méthode pour vérifier si la candidature existe déjà

    @Query("""
        select new org.example.doctoratrestapi.dtos.postuler.CandidatPostulesDto(
            c.id,
            CONCAT(c.nomCandidatArabe, ' ', c.prenomCandidatArabe),    
            c.cne,
            s.titre,
            CONCAT(ud.firstName, ' ', ud.firstName),
            CASE 
                when ucd is null then null 
                else concat(ucd.firstName, ' ', ucd.lastName)
            end,
            fd.titre
                                                  
            )
                from PostulerModel p
                join p.candidatModel c
                join p.sujetModel s
                join s.professeur d
                join d.user ud
                left join s.coDirecteur cd
                left join cd.user ucd
                join s.formation fd
                where d.laboratoire.id = :laboId                                
    """)
    Page<CandidatPostulesDto> findCandidatsPostulesByLabo(
            @Param("laboId") Long laboId,
            Pageable pageable
    );

    // This query ensures we only get applications linked to a Valid CED structure
    @Query("""
        SELECT p FROM PostulerModel p 
        JOIN p.sujetModel s 
        JOIN s.professeur prof 
        JOIN prof.laboratoire lab 
        JOIN lab.ced ced
    """)
    Page<PostulerModel> findAllPostulesForPole(Pageable pageable);
    boolean existsByCandidatModelAndSujetModel(CandidatModel candidat, SujetModel sujet);
    List<PostulerModel> findByCandidatModel_Id(Long candidatId);
    @Query("""
    select p from PostulerModel p
    join fetch p.candidatModel c
    where p.sujetModel.id = :sujetId
    """)
    List<PostulerModel> findBySujetIdWithCandidat(@Param("sujetId") Long sujetId);

    void deleteByCandidatModel_IdAndSujetModel_Id(Long candidatId, Long sujetId);

}