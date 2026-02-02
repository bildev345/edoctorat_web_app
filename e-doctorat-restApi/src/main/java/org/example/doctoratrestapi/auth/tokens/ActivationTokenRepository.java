package org.example.doctoratrestapi.auth.tokens;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActivationTokenRepository extends JpaRepository<ActivationTokenModel, Long> {
    Optional<ActivationTokenModel> findByToken(String token);
}
