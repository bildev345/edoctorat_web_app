package org.example.doctoratrestapi.auth.tokens;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doctoratrestapi.user.UserModel;

import java.time.Instant;

@Data
@NoArgsConstructor
@Entity
@Table(name = "activation_tokens")
public class ActivationTokenModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 120)
    private String token;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserModel user;

    @Column(nullable = false)
    private Instant expiresAt;

    // null = pas encore utilisé
    private Instant usedAt;

    //  utilisé ?
    public boolean isUsed() {
        return usedAt != null;
    }

    // expiré ?
    public boolean isExpired() {
        return expiresAt != null && expiresAt.isBefore(Instant.now());
    }
}
