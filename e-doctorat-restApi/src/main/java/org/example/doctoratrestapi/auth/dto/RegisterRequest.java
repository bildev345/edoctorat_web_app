package org.example.doctoratrestapi.auth.dto;

import lombok.Data;
import org.example.doctoratrestapi.auth.enums.SignupRole;

@Data
public class RegisterRequest {
    private String username;  // email
    private String password;
    private String firstName;
    private String lastName;
    private SignupRole role;  // CANDIDAT / SCOLARITE
}
