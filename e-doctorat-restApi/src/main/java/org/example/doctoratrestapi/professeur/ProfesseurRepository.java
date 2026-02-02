package org.example.doctoratrestapi.professeur;

import org.example.doctoratrestapi.models.ProfesseurModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfesseurRepository extends JpaRepository<ProfesseurModel, Long> {

    Optional<ProfesseurModel> findByUserId(Long userId);
}
