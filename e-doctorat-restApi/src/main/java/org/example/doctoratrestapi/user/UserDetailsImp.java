package org.example.doctoratrestapi.user;

import org.example.doctoratrestapi.models.RoleModel;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class UserDetailsImp  implements UserDetails {
    private UserModel user;
    public UserDetailsImp(UserModel user){
        this.user = user;
    }
    public String getUsername(){
        return user.getUsername();
    }
    public String getPassword(){
        return user.getPassword();
    }
    public long getId(){return user.getId();}

    public boolean isEnabled() {
        return user.isEnabled(); //  bloque login si enabled=false
    }
    public UserModel getUser() {
        return user;
    }


    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        //return Collections.singleton(new SimpleGrantedAuthority("USER"));
        Set<RoleModel> roles = user.getRoles();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for(RoleModel role : roles){
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }

}
