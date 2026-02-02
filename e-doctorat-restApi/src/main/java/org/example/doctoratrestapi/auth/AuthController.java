package org.example.doctoratrestapi.auth;

import lombok.RequiredArgsConstructor;
import org.example.doctoratrestapi.api.ApiResponse;
import org.example.doctoratrestapi.auth.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest req) {
        try {
            AuthResponse data = authService.login(req);
            return ResponseEntity.ok(new ApiResponse<>(true, null, data, Instant.now()));
        } catch (DisabledException e) {
            return ResponseEntity.status(401).body(
                    new ApiResponse<>(false, "Compte non activé. Vérifiez votre email.", null, Instant.now())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(
                    new ApiResponse<>(false, "Identifiants incorrects.", null, Instant.now())
            );
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody RegisterRequest req) {
        try {
            authService.register(req);
            return ResponseEntity.ok(new ApiResponse<>(true,
                    "Compte créé. Vérifiez votre boîte email pour activer votre compte.",
                    null, Instant.now()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, e.getMessage(), null, Instant.now())
            );
        } catch (Exception e) {
            // si mail fail ou autre
            return ResponseEntity.status(500).body(
                    new ApiResponse<>(false, "Erreur serveur (mail). Vérifiez la configuration SMTP.", null, Instant.now())
            );
        }
    }

    @GetMapping("/activate")
    public ResponseEntity<ApiResponse<AuthResponse>> activate(@RequestParam String token) {
        try {
            AuthResponse data = authService.activateAccount(token);
            return ResponseEntity.ok(new ApiResponse<>(true,
                    "Compte activé. Redirection...",
                    data, Instant.now()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, e.getMessage(), null, Instant.now())
            );
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@RequestBody ForgotPasswordRequest req) {
        try {
            authService.forgotPassword(req.getEmail());
            return ResponseEntity.ok(new ApiResponse<>(true,
                    "Email de réinitialisation envoyé.",
                    null, Instant.now()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false,
                    e.getMessage(), null, Instant.now()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false,
                    "Erreur serveur (mail). Vérifiez la configuration SMTP.",
                    null, Instant.now()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody ResetPasswordRequest req) {
        try {
            authService.resetPassword(req.getToken(), req.getNewPassword());
            return ResponseEntity.ok(new ApiResponse<>(true,
                    "Mot de passe mis à jour.",
                    null, Instant.now()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false,
                    e.getMessage(), null, Instant.now()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false,
                    "Erreur serveur.",
                    null, Instant.now()));
        }
    }

}
