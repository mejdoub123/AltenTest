package com.example.altenecom.service;

import com.example.altenecom.model.Cart;
import com.example.altenecom.model.Product;
import com.example.altenecom.model.User;
import com.example.altenecom.model.Wishlist;
import com.example.altenecom.repository.ProductRepository;
import com.example.altenecom.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    public Wishlist getWishlist(Long wishlistId) {
        return wishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));
    }

    public Wishlist addProductToWishlist(Long wishlistId, Long productId) {
        Wishlist wishlist = getWishlist(wishlistId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        wishlist.getProducts().add(product);
        return wishlistRepository.save(wishlist);
    }

    public Wishlist removeProductFromWishlist(Long wishlistId, Long productId) {
        Wishlist wishlist = getWishlist(wishlistId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        wishlist.getProducts().remove(product);
        return wishlistRepository.save(wishlist);
    }

    public void createWishlist(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        user.setWishlist(wishlist);
        wishlistRepository.save(wishlist);
    }
}
