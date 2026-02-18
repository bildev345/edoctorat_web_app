package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.dtos.sujet.SujetPoleDto;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SujetRepository extends JpaRepository<SujetModel, Long> {

    // Prof : sujets par professeurId (utile si tu as déjà l'id prof)
    List<SujetModel> findByProfesseurId(Long professeurId);

    // Prof : sujets du professeur connecté via userId (le plus utile pour ton controller)
    @Query("select s from SujetModel s join s.professeur p where p.user.id = :userId")
    List<SujetModel> findByProfUserId(@Param("userId") Long userId);

    // Optionnel : vérifier que le sujet appartient au prof connecté (sécurité update/delete)
    @Query("select count(s) > 0 from SujetModel s join s.professeur p where s.id = :sujetId and p.user.id = :userId")
    boolean existsByIdAndProfUserId(@Param("sujetId") Long sujetId, @Param("userId") Long userId);
    @Query("""
    select count(s) > 0
    from SujetModel s
    join s.professeur p
    where s.id = :sujetId and p.laboratoire.id = :laboId
    """)
    boolean existsByIdAndLaboId(@Param("sujetId") Long sujetId, @Param("laboId") Long laboId);

    @Query("""
        SELECT s.professeur.laboratoire.id, s.titre
        FROM SujetModel s
        WHERE s.professeur.laboratoire.id IN :laboIds
    """)
    List<Object[]> findSujetsTitresByLaboratoireIds(
            @Param("laboIds") List<Long> laboIds
    );

    @Query("""
        select s
        from SujetModel s
        join s.professeur p
        where p.laboratoire.id = :laboId
    """)
    List<SujetModel> getAllSujetsByLaboId(
            @Param("laboId") Long laboId
    );

    @Query("""
   SELECT new org.example.doctoratrestapi.dtos.sujet.SujetPoleDto(
        s.id,
        s.titre,
        CONCAT(d.user.firstName, ' ', d.user.lastName),
        CASE 
            WHEN cd IS NOT NULL 
            THEN CONCAT(cd.user.firstName, ' ', cd.user.lastName)
            ELSE NULL
        END,
        l.nomLaboratoire,
        f.titre,
        ced.titre,
        s.publier
   )
   FROM SujetModel s
   JOIN s.professeur d
   LEFT JOIN s.coDirecteur cd
   JOIN d.laboratoire l
   JOIN s.formation f
   JOIN f.ced ced
""")
    Page<SujetPoleDto> findAllSujetsForPole(Pageable pageable);

    // 1. Basic Fetch by Labo
    @Query("select s from SujetModel s join s.professeur p where p.laboratoire.id = :laboId")
    Page<SujetModel> getSujetsByLaboId(@Param("laboId") Long laboId, Pageable pageable);

    @Query("select s from SujetModel s join s.professeur p where p.laboratoire.id =:laboId")
    List<SujetModel> getSujetsByLaboId(@Param("laboId") Long laboId);
    // 2. Search by Title AND Labo (New Requirement)
    // Note: Traversing Sujet -> Professeur -> Laboratoire
    Page<SujetModel> findByProfesseurLaboratoireIdAndTitreContainingIgnoreCase(Long laboId, String titre, Pageable pageable);
    
    @Query("SELECT s FROM SujetModel s " +
           "WHERE s.professeur.laboratoire.id = :laboId " +
           "AND LOWER(s.titre) LIKE LOWER(CONCAT('%', :filter, '%')) " +
           "ORDER BY s.id DESC")
    Page<SujetModel> getSujetsByLaboIdAndTitreContaining(
            @Param("laboId") Long laboId, 
            @Param("filter") String filter, 
            Pageable pageable
    );
}
