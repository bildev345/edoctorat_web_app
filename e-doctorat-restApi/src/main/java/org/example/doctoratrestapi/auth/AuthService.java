package org.example.doctoratrestapi.auth;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.auth.dto.AuthResponse;
import org.example.doctoratrestapi.auth.dto.LoginRequest;
import org.example.doctoratrestapi.auth.dto.RegisterRequest;
import org.example.doctoratrestapi.auth.mail.MailService;
import org.example.doctoratrestapi.auth.tokens.ActivationTokenModel;
import org.example.doctoratrestapi.auth.tokens.ActivationTokenRepository;
import org.example.doctoratrestapi.auth.tokens.PasswordResetTokenModel;
import org.example.doctoratrestapi.auth.tokens.PasswordResetTokenRepository;
import org.example.doctoratrestapi.exception.ResourceNotFoundException;
import org.example.doctoratrestapi.models.RoleModel;
import org.example.doctoratrestapi.user.JwtService;
import org.example.doctoratrestapi.user.UserModel;
import org.example.doctoratrestapi.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final JwtService jwtService;

    private final ActivationTokenRepository activationRepo;
    private final MailService mailService;
    private final PasswordResetTokenRepository passwordResetRepo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Value("${app.frontend-url}")
    private String frontendUrl;

    // ✅ LOGIN
    public AuthResponse login(LoginRequest req) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
        );

        UserModel user = userRepo.findByUsername(req.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.isEnabled()) {
            throw new DisabledException("Account disabled");
        }

        String token = jwtService.generateToken(user);
        List<String> roles = user.getRoles().stream().map(RoleModel::getName).toList();

        return new AuthResponse(token, user.getId(), user.getUsername(), roles);
    }

    // ✅ REGISTER + email activation
    // IMPORTANT: Transaction => si mail échoue -> rollback => pas d’utilisateur en DB
    @Transactional
    public void register(RegisterRequest req) {

        if (req.getRole() == null) {
            throw new IllegalArgumentException("Role obligatoire (CANDIDAT ou SCOLARITE)");
        }

        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        String roleName = switch (req.getRole()) {
            case CANDIDAT -> "ROLE_CANDIDAT";
            case SCOLARITE -> "ROLE_SCOLARITE";
        };

        RoleModel role = userRepo.findRoleByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException(roleName + " introuvable dans la table roles"));

        UserModel user = new UserModel();
        user.setUsername(req.getUsername().trim());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEnabled(false);
        user.setRoles(Set.of(role));

        userRepo.save(user);

        String token = UUID.randomUUID().toString();
        ActivationTokenModel act = new ActivationTokenModel();
        act.setToken(token);
        act.setUser(user);
        act.setExpiresAt(Instant.now().plus(30, ChronoUnit.MINUTES));
        activationRepo.save(act);

        // ✅ lien FRONT (React)
        String activationLink = frontendUrl + "/activate?token=" + token;

        // ⚠️ si ça échoue => exception => rollback
        mailService.sendActivationMail(user.getUsername(), activationLink);
    }

    // ✅ ACTIVER + retourner JWT (pour auto-login si tu veux)
    public AuthResponse activateAccount(String token) {
        ActivationTokenModel act = activationRepo.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Token invalide"));

        if (act.isUsed()) {
            throw new IllegalArgumentException("Token déjà utilisé");
        }
        if (act.isExpired()) {
            throw new IllegalArgumentException("Token expiré");
        }

        UserModel user = act.getUser();
        user.setEnabled(true);
        userRepo.save(user);

        act.setUsedAt(Instant.now());
        activationRepo.save(act);

        String jwt = jwtService.generateToken(user);
        List<String> roles = user.getRoles().stream().map(RoleModel::getName).toList();
        return new AuthResponse(jwt, user.getId(), user.getUsername(), roles);
    }

    @Transactional
    public void forgotPassword(String email) {

        UserModel user = userRepo.findByUsername(email)
                .orElseThrow(() -> new IllegalArgumentException("Email introuvable"));

        String token = UUID.randomUUID().toString();

        PasswordResetTokenModel prt = new PasswordResetTokenModel();
        prt.setToken(token);
        prt.setUser(user);
        prt.setExpiresAt(Instant.now().plus(30, ChronoUnit.MINUTES));

        passwordResetRepo.save(prt);

        String link = frontendUrl + "/reset-password?token=" + token;
        mailService.sendResetPasswordMail(user.getUsername(), link);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {

        PasswordResetTokenModel prt = passwordResetRepo.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token invalide"));

        if (prt.isUsed() || prt.isExpired()) {
            throw new IllegalArgumentException("Token expiré ou déjà utilisé");
        }

        UserModel user = prt.getUser();
        user.setPassword(encoder.encode(newPassword));
        userRepo.save(user);

        prt.setUsedAt(Instant.now());
        passwordResetRepo.save(prt);
    }

}
