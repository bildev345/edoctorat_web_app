package org.example.doctoratrestapi.auth.tokens;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetTokenModel, Long> {

    Optional<PasswordResetTokenModel> findByToken(String token);
}
