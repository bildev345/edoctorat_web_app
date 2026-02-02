package org.example.doctoratrestapi.repositories;

import org.example.doctoratrestapi.models.NotificationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface NotificationRepository extends JpaRepository<NotificationModel, Long> {

    List<NotificationModel> findByCandidatId(Long candidatId);
    List<NotificationModel> findByCandidatIdOrderByIdDesc(Long candidatId);

}
