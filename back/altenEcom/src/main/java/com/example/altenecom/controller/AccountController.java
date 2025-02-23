package com.example.altenecom.controller;

import com.example.altenecom.model.User;
import com.example.altenecom.service.CartService;
import com.example.altenecom.service.JwtService;
import com.example.altenecom.service.UserService;
import com.example.altenecom.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class AccountController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CartService cartService;

    @Autowired
    private WishlistService wishlistService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/account")
    public User createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);

        // Create a cart for the newly created user
        cartService.createCart(createdUser);

        // Create a wishlist for the newly created user
        wishlistService.createWishlist(createdUser);

        return createdUser;
    }

    @PostMapping("/token")
    public Map<String, Object> generateToken(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        User user = userService.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            String jwtToken = jwtService.generateToken(
                    Map.of("userId", user.getId(), "isAdmin", user.getRoles().contains("ADMIN")),
                    user.getEmail()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwtToken);
            response.put("user", user);
            return response;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}