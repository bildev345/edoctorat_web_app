package org.example.doctoratrestapi.user.oauth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.doctoratrestapi.models.RoleModel;
import org.example.doctoratrestapi.user.JwtService;
import org.example.doctoratrestapi.user.UserModel;
import org.example.doctoratrestapi.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Set;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired private UserRepository userRepo;
    @Autowired private JwtService jwtService;

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    private static final Set<String> ALLOWED_GOOGLE_ROLES = Set.of(
            "ROLE_PROFESSOR",
            "ROLE_DIRECTEUR_LABO",
            "ROLE_DIRECTEUR_POLE",
            "ROLE_DIRECTEUR_CED"
    );

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        if (email == null || email.isBlank()) {
            redirectStrategy.sendRedirect(request, response, "http://localhost:5173/login?oauthError=NO_EMAIL");
            return;
        }

        var userOpt = userRepo.findByUsername(email);
        if (userOpt.isEmpty()) {
            redirectStrategy.sendRedirect(request, response, "http://localhost:5173/login?oauthError=USER_NOT_FOUND");
            return;
        }

        UserModel user = userOpt.get();

        if (!user.isEnabled()) {
            redirectStrategy.sendRedirect(request, response, "http://localhost:5173/login?oauthError=ACCOUNT_DISABLED");
            return;
        }

        boolean okRole = user.getRoles().stream()
                .map(RoleModel::getName)
                .anyMatch(ALLOWED_GOOGLE_ROLES::contains);

        if (!okRole) {
            redirectStrategy.sendRedirect(request, response, "http://localhost:5173/login?oauthError=ROLE_NOT_ALLOWED");
            return;
        }

        String jwt = jwtService.generateToken(user);

        String redirectUrl = "http://localhost:5173/oauth2/callback?token="
                + URLEncoder.encode(jwt, StandardCharsets.UTF_8);

        redirectStrategy.sendRedirect(request, response, redirectUrl);
    }
}
