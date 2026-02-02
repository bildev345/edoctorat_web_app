package org.example.doctoratrestapi.repositories.scolarite;

import org.example.doctoratrestapi.dtos.inscription.ScolariteCandidatLookupDto;
import org.example.doctoratrestapi.models.CandidatModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScolariteCandidatLookupRepository extends JpaRepository<CandidatModel, Long> {

    @Query("""
        select new org.example.doctoratrestapi.dtos.inscription.ScolariteCandidatLookupDto(
            c.id, c.cne, c.nomCandidatArabe, c.prenomCandidatArabe
        )
        from CandidatModel c
        order by c.cne asc
    """)
    List<ScolariteCandidatLookupDto> findAllLookup();
}
