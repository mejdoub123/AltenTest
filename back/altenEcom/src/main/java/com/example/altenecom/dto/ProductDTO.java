package com.example.altenecom.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductDTO {
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

    private String inventoryStatus;

    @Min(0)
    @Max(5)
    private Double rating;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}