package org.example.doctoratrestapi.user;

import org.example.doctoratrestapi.models.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByUsername(String username);

    @Query("select r from RoleModel r where r.name = :name")
    Optional<RoleModel> findRoleByName(String name);
}
