package org.example.doctoratrestapi.directeurCed;

import org.example.doctoratrestapi.models.CedModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CedRepository extends JpaRepository<CedModel, Long> {
    Optional<CedModel> findByDirecteurUserId(Long userId);
    @Query("SELECT c.Id FROM CedModel c")
    List<Long> findAllCedIds();
}
