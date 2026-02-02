package org.example.doctoratrestapi.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<UserModel> user = userRepository.findByUsername(username);
        if(user.isEmpty()){
            System.out.println("User not found 404!!!");
            throw new UsernameNotFoundException("User 404");
        }
        // l'objet passé en paramétre on peut le récuperer dans le méthode getAuthorities
        return new UserDetailsImp(user.get());
    }

}
