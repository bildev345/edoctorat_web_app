package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleModel, Long> {
    Optional<RoleModel> findByName(String roleProfessor);

}
