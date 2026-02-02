package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.ExaminerModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExaminerRepository extends JpaRepository<ExaminerModel, Long> {

    // récupérer les examinations par laboratoire :
    // via la commission (qui pointe vers laboratoire)
    List<ExaminerModel> findByCommission_Laboratoire_Id(Long laboId);

    @Query("select ex from ExaminerModel ex join ex.commission c where c.laboratoire.id = :laboId")
    List<ExaminerModel> findExaminationsByLabo(@Param("laboId") long laboId);

    @Query("select ex from ExaminerModel ex")
    List<ExaminerModel> findExaminationsByFormations(@Param("formationIds") List<Long> formationIds);

    @Query("""
            select ex from ExaminerModel ex
            join fetch ex.candidat c
            where ex.commission.id = :commissionId and ex.sujet.id = :sujetId
            """)
    List<ExaminerModel> findByCommissionIdAndSujetId(@Param("commissionId") Long commissionId,
                                                     @Param("sujetId") Long sujetId);

    @Query("""
            select ex from ExaminerModel ex
            join fetch ex.candidat c
            join fetch ex.sujet s
            join fetch ex.commission co
            join co.commissionProfesseurs cp
            where cp.professeur.user.id = :userId
            and ex.decision in ('LA','LP')
            """)
    List<ExaminerModel> findResultatsForProf(@Param("userId") Long userId);

    Optional<ExaminerModel> findOneByCommissionIdAndSujetIdAndCandidatId(Long commissionId, Long sujetId, Long candidatId);

    boolean existsByCommissionIdAndSujetIdAndCandidatId(Long commissionId, Long sujetId, Long candidatId);
    @Query("""
    SELECT ex
    FROM ExaminerModel ex
    JOIN ex.commission c
    WHERE c.laboratoire.id = :laboId
    """)
    Page<ExaminerModel> findExaminationsByLabo(
            @Param("laboId") long laboId,
            Pageable pageable
    );

    @Query("""
      SELECT e FROM ExaminerModel e
      JOIN e.sujet s
      JOIN s.formation f
      JOIN f.ced ced
      WHERE ced.Id IN :cedIds
      AND e.decision = :decision
    """)
    Page<ExaminerModel> findByDecisionForPole(
            @Param("cedIds") List<Long> cedIds,
            @Param("decision") String decision,
            Pageable pageable
    );
    // ✅ OPTIMIZED: Bulk update instead of loop
    @Modifying
    @Query("""
        UPDATE ExaminerModel e 
        SET e.publier = true 
        WHERE e.decision = :decision 
        AND e.sujet.id IN (
            SELECT s.id FROM SujetModel s 
            JOIN s.formation f 
            JOIN f.ced ced 
            WHERE ced.Id IN :cedIds
        )
    """)
    void publierResultatsMassive(
            @Param("cedIds") List<Long> cedIds,
            @Param("decision") String decision
    );







}