package org.example.doctoratrestapi.auth.dto;

import java.util.List;

public record AuthResponse(
        String token,
        Long userId,
        String username,
        List<String> roles
) {}
