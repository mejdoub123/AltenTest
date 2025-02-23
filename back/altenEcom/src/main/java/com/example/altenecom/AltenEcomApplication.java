package com.example.altenecom;

import com.example.altenecom.enums.InventoryStatus;
import com.example.altenecom.model.*;
import com.example.altenecom.repository.CartRepository;
import com.example.altenecom.repository.ProductRepository;
import com.example.altenecom.repository.UserRepository;
import com.example.altenecom.repository.WishlistRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.*;

@SpringBootApplication
public class AltenEcomApplication {

    public static void main(String[] args) {
        SpringApplication.run(AltenEcomApplication.class, args);
    }
    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository,
                                   UserRepository userRepository,
                                   CartRepository cartRepository,
                                   WishlistRepository wishlistRepository) {
        return args -> {
            // Create and save products
            List<Product> products = List.of(
                    new Product(null, "P001", "Laptop", "High-performance laptop", "https://media.istockphoto.com/id/1311600080/photo/small-shipping-packages-on-a-notebook-with-the-inscription-online-shopping.jpg?s=612x612&w=0&k=20&c=vDPqIQsqzCvEaEZF2R5IeGz_8Gv-YRI_HzbKux8TaqM=", "Electronics", 1200.0, 10, "REF123", 1L, InventoryStatus.INSTOCK, 4.5, null, null, null),
                    new Product(null, "P002", "Smartphone", "Latest model smartphone", "https://media.istockphoto.com/id/1311600080/photo/small-shipping-packages-on-a-notebook-with-the-inscription-online-shopping.jpg?s=612x612&w=0&k=20&c=vDPqIQsqzCvEaEZF2R5IeGz_8Gv-YRI_HzbKux8TaqM=", "Electronics", 800.0, 5, "REF456", 2L, InventoryStatus.LOWSTOCK, 4.7, null, null, null),
                    new Product(null, "P003", "Headphones", "Noise-cancelling headphones", "https://media.istockphoto.com/id/1311600080/photo/small-shipping-packages-on-a-notebook-with-the-inscription-online-shopping.jpg?s=612x612&w=0&k=20&c=vDPqIQsqzCvEaEZF2R5IeGz_8Gv-YRI_HzbKux8TaqM=", "Accessories", 150.0, 20, "REF789", 3L, InventoryStatus.INSTOCK, 4.9, null, null, null)
            );
            productRepository.saveAll(products);

            // Create users
            List<User> users = List.of(
                    new User(null, "alice123", "Alice", "alice@example.com", "password123", Set.of("USER"), null, null),
                    new User(null, "bob456", "Bob", "bob@example.com", "password456", Set.of("USER", "ADMIN"), null, null),
                    new User(null, "charlie789", "Charlie", "charlie@example.com", "password789", Set.of("USER"), null, null)
            );

            for (User user : users) {
                // Save user first (to generate ID)
                userRepository.save(user);

                // Create cart for the user
                Cart cart = new Cart();
                cart.setUser(user);
                cart.setItems(new ArrayList<>());

                for (Product product : products) {
                    CartItem cartItem = new CartItem();
                    cartItem.setCart(cart);
                    cartItem.setProduct(product);
                    cartItem.setQuantity((int) (Math.random() * 5) + 1); // Random quantity (1-5)
                    cart.getItems().add(cartItem);
                }

                // Save the cart to the database
                cartRepository.save(cart);
                user.setCart(cart);

                // Create and save wishlist
                Wishlist wishlist = new Wishlist();
                wishlist.setUser(user);
                wishlist.setProducts(products.subList(1, products.size())); // Excluding first product
                wishlistRepository.save(wishlist);
                user.setWishlist(wishlist);

                // After cart and wishlist are saved, update the user
                userRepository.save(user);
            }

            System.out.println("✅ Database initialized with multiple users, carts, and wishlists.");
        };
    }
}
