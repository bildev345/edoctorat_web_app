package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.CommissionModel;
import org.example.doctoratrestapi.models.CommissionProfesseurModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommissionRepository extends JpaRepository<CommissionModel, Long> {

    @Query("SELECT DISTINCT c FROM CommissionModel c " +
            "LEFT JOIN FETCH c.laboratoire " +
            "LEFT JOIN FETCH c.commissionProfesseurs cp " +
            "LEFT JOIN FETCH cp.professeur " +
            "WHERE cp.professeur.id = :professeurId")
    List<CommissionModel> findByProfesseurId(long professeurId);

    // hafssa: check prof appartient à commission
    @Query("""
select count(cp) > 0 from CommissionProfesseurModel cp
join cp.commission c
join cp.professeur p
where c.id = :commissionId and p.user.id = :userId
""")
    boolean isProfMemberOfCommission(@Param("commissionId") Long commissionId,
                                     @Param("userId") Long userId);


    Page<CommissionModel> findByLaboratoireId(Long laboId, Pageable pageable);

//    @Query("""
//        select distinct c from CommissionModel c
//        join c.laboratoire l
//        join l.ced ced
//        where ced.Id = :cedId
//    """)
//    Page<CommissionModel> findByCedId(
//                @Param("cedId") Long cedId,
//                Pageable pageable
//    );
@Query("""
        SELECT c FROM CommissionModel c
        JOIN c.laboratoire l
        JOIN l.ced ced
        WHERE ced.Id IN :cedIds
    """)
Page<CommissionModel> findByCedIds(@Param("cedIds") List<Long> cedIds, Pageable pageable);

}

