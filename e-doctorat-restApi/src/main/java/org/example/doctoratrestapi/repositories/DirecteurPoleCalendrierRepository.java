package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.dtos.calendrier.CalendrierPoleDto;
import org.example.doctoratrestapi.models.DirecteurPoleCalendrierModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirecteurPoleCalendrierRepository extends JpaRepository<DirecteurPoleCalendrierModel, Long> {
    @Query("SELECT new org.example.doctoratrestapi.dtos.calendrier.CalendrierPoleDto(" +
            "c.id, c.action, c.dateDebut, c.dateFin, c.pour) " +
            "FROM DirecteurPoleCalendrierModel c")
    List<CalendrierPoleDto> findAllCalendrier();

}
