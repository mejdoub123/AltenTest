package com.example.altenecom.controller;

import com.example.altenecom.model.Wishlist;
import com.example.altenecom.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlists")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{id}")
    public Wishlist getWishlist(@PathVariable Long id) {
        return wishlistService.getWishlist(id);
    }

    @PostMapping("/{wishlistId}/products/{productId}")
    public Wishlist addProductToWishlist(@PathVariable Long wishlistId, @PathVariable Long productId) {
        return wishlistService.addProductToWishlist(wishlistId, productId);
    }

    @DeleteMapping("/{wishlistId}/products/{productId}")
    public Wishlist removeProductFromWishlist(@PathVariable Long wishlistId, @PathVariable Long productId) {
        return wishlistService.removeProductFromWishlist(wishlistId, productId);
    }
}
