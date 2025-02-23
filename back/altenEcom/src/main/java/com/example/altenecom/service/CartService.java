package com.example.altenecom.service;

import com.example.altenecom.model.Cart;
import com.example.altenecom.model.CartItem;
import com.example.altenecom.model.Product;
import com.example.altenecom.model.User;
import com.example.altenecom.repository.CartItemRepository;
import com.example.altenecom.repository.CartRepository;
import com.example.altenecom.repository.ProductRepository;
import com.example.altenecom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public Cart getCartById(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        return optionalCart.orElseThrow(() -> new IllegalArgumentException("Cart not found"));
    }

    public Cart addItemToCart(Long cartId, Long productId, Integer quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalCart.isPresent() && optionalProduct.isPresent()) {
            Cart cart = optionalCart.get();
            Product product = optionalProduct.get();

            if (quantity > product.getQuantity()) {
                throw new IllegalArgumentException("Requested quantity exceeds available stock");
            }

            CartItem existingCartItem = cart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst()
                    .orElse(null);

            if (existingCartItem != null) {
                existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
            } else {
                CartItem newItem = new CartItem();
                newItem.setCart(cart);
                newItem.setProduct(product);
                newItem.setQuantity(quantity);
                cart.getItems().add(newItem);
                cartItemRepository.save(newItem);
            }

            return cartRepository.save(cart);
        } else {
            throw new IllegalArgumentException("Cart or Product not found");
        }
    }

    public Cart removeItemFromCart(Long cartId, Long productId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalCart.isPresent() && optionalProduct.isPresent()) {
            Cart cart = optionalCart.get();
            Product product = optionalProduct.get();

            CartItem itemToRemove = cart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst()
                    .orElse(null);

            if (itemToRemove != null) {
                cart.getItems().remove(itemToRemove);
                cartItemRepository.delete(itemToRemove);
                return cartRepository.save(cart);
            } else {
                throw new IllegalArgumentException("Item not found in cart");
            }
        } else {
            throw new IllegalArgumentException("Cart or Product not found");
        }
    }

    public Cart updateCartItemQuantity(Long cartId, Long productId, Integer quantity) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalCart.isPresent() && optionalProduct.isPresent()) {
            Cart cart = optionalCart.get();
            Product product = optionalProduct.get();

            if (quantity <= 0) {
                throw new IllegalArgumentException("Quantity must be greater than zero");
            }

            if (quantity > product.getQuantity()) {
                throw new IllegalArgumentException("Requested quantity exceeds available stock");
            }

            CartItem cartItemToUpdate = cart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst()
                    .orElse(null);

            if (cartItemToUpdate != null) {
                cartItemToUpdate.setQuantity(quantity);
                return cartRepository.save(cart);
            } else {
                throw new IllegalArgumentException("Item not found in cart");
            }
        } else {
            throw new IllegalArgumentException("Cart or Product not found");
        }
    }


    public void createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        user.setCart(cart);
        cartRepository.save(cart);
    }
}