package org.example.doctoratrestapi.repositories.scolarite;

import org.example.doctoratrestapi.dtos.inscription.ScolariteSujetLookupDto;
import org.example.doctoratrestapi.models.SujetModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScolariteSujetLookupRepository extends JpaRepository<SujetModel, Long> {

    @Query("""
        select new org.example.doctoratrestapi.dtos.inscription.ScolariteSujetLookupDto(
            s.id, s.titre,
            f.id, f.titre,
            ced.Id, ced.titre,
            labo.id, labo.nomLaboratoire
        )
        from SujetModel s
        left join s.formation f
        left join f.ced ced
        left join s.professeur p
        left join p.laboratoire labo
        order by s.titre asc
    """)
    List<ScolariteSujetLookupDto> findAllLookup();
}
