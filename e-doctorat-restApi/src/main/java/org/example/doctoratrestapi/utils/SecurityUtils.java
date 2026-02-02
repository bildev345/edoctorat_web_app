package org.example.doctoratrestapi.utils;

import org.example.doctoratrestapi.user.UserDetailsImp;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    private SecurityUtils(){}
    public static Long currentUserId(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || !auth.isAuthenticated()){
            throw new IllegalStateException("No authticated user found");
        }
        Object principal = auth.getPrincipal();
        if(!(principal instanceof  UserDetailsImp userDetails)){
            throw new IllegalStateException("Invalid authentication principal");
        }
        return userDetails.getId();
    }
}
