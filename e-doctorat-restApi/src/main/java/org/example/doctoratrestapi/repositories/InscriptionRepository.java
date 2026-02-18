package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.dtos.inscription.InscriptionPoleDto;
import org.example.doctoratrestapi.models.InscriptionModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface InscriptionRepository extends JpaRepository<InscriptionModel, Long> {

    // Prof : inscriptions d’un sujet
    List<InscriptionModel> findInscriptionModelsBySujet_Id(Long sujetId);

    @Query("select i from InscriptionModel i join i.sujet s join s.professeur p where p.user.id = :userId")
    List<InscriptionModel> findByProfUserId(@Param("userId") Long userId);


    @Query("select i from InscriptionModel i join i.sujet s join s.professeur p " +
            "join p.laboratoire l where l.directeur.id= :directeurId")
    List<InscriptionModel> getCandidatsByDirecteurId(@Param("directeurId") Long directeurId);

    public boolean existsByCandidatId(Long candidatId);

    @Query("""
        select i
        from InscriptionModel i
        join i.sujet s
        join s.professeur p
        where p.laboratoire.id = :laboId
    """)
    Page<InscriptionModel> getInscriptionsByLaboId(Long laboId, Pageable pageable);

    @Query("""
        SELECT new org.example.doctoratrestapi.dtos.inscription.InscriptionPoleDto(
            i.id, 
            c.cne, 
            c.user.lastName, 
            c.user.firstName, 
            s.titre, 
            l.nomLaboratoire, 
            ced.titre, 
            i.dateDeposerDossier
        )
        FROM InscriptionModel i
        JOIN i.candidat c
        JOIN i.sujet s
        JOIN s.professeur p      
        JOIN p.laboratoire l     
        JOIN s.formation f
        JOIN f.ced ced
        WHERE ced.Id IN :cedIds
        AND i.valider = true
    """)
    Page<InscriptionPoleDto> findValidatedInscriptionsByPole(
            @Param("cedIds") List<Long> cedIds,
            Pageable pageable
    );

    @Query("""
        SELECT new org.example.doctoratrestapi.dtos.inscription.InscriptionPoleDto(
            i.id, 
            c.cne, 
            c.user.lastName, 
            c.user.firstName, 
            s.titre, 
            l.nomLaboratoire, 
            ced.titre, 
            i.dateDeposerDossier
        )
        FROM InscriptionModel i
        JOIN i.candidat c
        JOIN i.sujet s
        JOIN s.professeur p
        JOIN p.laboratoire l
        JOIN s.formation f
        JOIN f.ced ced
        WHERE ced.Id IN :cedIds
        AND i.valider = true
    """)
    List<InscriptionPoleDto> findAllValidatedInscriptionsByPole(@Param("cedIds") List<Long> cedIds);



}



