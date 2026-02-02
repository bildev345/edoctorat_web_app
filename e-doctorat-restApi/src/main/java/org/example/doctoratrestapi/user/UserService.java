package org.example.doctoratrestapi.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserModel register(UserModel user){
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
}
