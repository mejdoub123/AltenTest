package com.example.altenecom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.altenecom.enums.InventoryStatus;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String code;

    @NotBlank
    private String name;

    private String description;

    private String image;

    @NotBlank
    private String category;

    @NotNull
    @Positive
    private Double price;

    @NotNull
    @Min(0)
    private Integer quantity;

    private String internalReference;

    private Long shellId;

    @Enumerated(EnumType.STRING)
    private InventoryStatus inventoryStatus;

    @Min(0)
    @Max(5)
    private Double rating;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToMany(mappedBy = "products")
    @JsonIgnore
    private List<Wishlist> wishlists;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

