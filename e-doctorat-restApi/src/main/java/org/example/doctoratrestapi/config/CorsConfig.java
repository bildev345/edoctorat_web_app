package org.example.doctoratrestapi.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Front Vite
        config.setAllowedOrigins(List.of("http://localhost:5173"));

        // IMPORTANT pour Authorization + JSON
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));

        // Méthodes utilisées
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Si tu n'utilises PAS cookies/session, laisse false
        config.setAllowCredentials(false);

        // (optionnel) headers exposés
        config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
