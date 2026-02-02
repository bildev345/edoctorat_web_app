package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.CommissionProfesseurModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommissionProfesseurRepository extends JpaRepository<CommissionProfesseurModel, Long> {

    @Query("select pm from CommissionProfesseurModel pm join pm.professeur p where p.id = :professeurId ")
    List<CommissionProfesseurModel> findByProfesseur_Id(@Param("professeurId") long professeurId);

    //List<CommissionProfesseurModel> findByCommission_Id(long commissionId);
    @Query("""
    SELECT DISTINCT p.id
    FROM CommissionProfesseurModel pc
    JOIN pc.professeur p
    WHERE pc.commission.id IN :commissionIds
""")
    List<Long> findProfessorIdsByCommissionIds(
            @Param("commissionIds") List<Long> commissionIds
    );
    @Query("""
        SELECT pc.commission.id,
               CONCAT(u.firstName, ' ', u.lastName)
        FROM CommissionProfesseurModel pc
        JOIN pc.professeur p
        JOIN p.user u
        WHERE pc.commission.id IN :commissionIds
    """)
    List<Object[]> findMemberNamesByCommissionIds(
            @Param("commissionIds") List<Long> commissionIds
    );
}
