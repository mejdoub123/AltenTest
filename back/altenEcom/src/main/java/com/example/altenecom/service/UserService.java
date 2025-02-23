package com.example.altenecom.service;

import com.example.altenecom.model.User;
import com.example.altenecom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Automatically assign ROLE_ADMIN to admin@admin.com
        Set<String> roles = new HashSet<>();
        if ("admin@admin.com".equals(user.getEmail())) {
            roles.add("ADMIN");
        } else {
            roles.add("USER");
        }
        user.setRoles(roles);

        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}