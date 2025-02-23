package com.example.altenecom.controller;

import com.example.altenecom.model.Cart;
import com.example.altenecom.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/{cartId}/items/{productId}")
    public Cart addItemToCart(@PathVariable Long cartId, @PathVariable Long productId, @RequestParam Integer quantity) {
        return cartService.addItemToCart(cartId, productId, quantity);
    }

    @DeleteMapping("/{cartId}/items/{productId}")
    public Cart removeItemFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
        return cartService.removeItemFromCart(cartId, productId);
    }

    @GetMapping("/{cartId}")
    public Cart getCartById(@PathVariable Long cartId) {
        return cartService.getCartById(cartId);
    }

    @PutMapping("/{cartId}/items/{productId}")
    public Cart updateCartItemQuantity(@PathVariable Long cartId, @PathVariable Long productId, @RequestParam Integer quantity) {
        return cartService.updateCartItemQuantity(cartId, productId, quantity);
    }
}