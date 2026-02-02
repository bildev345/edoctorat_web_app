package org.example.doctoratrestapi.user;

import jakarta.persistence.*;
import lombok.Data;
import org.example.doctoratrestapi.models.RoleModel;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name="users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // email
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private boolean enabled = false;

    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name="user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleModel> roles = new HashSet<>();
}
