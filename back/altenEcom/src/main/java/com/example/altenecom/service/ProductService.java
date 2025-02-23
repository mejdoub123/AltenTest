package com.example.altenecom.service;

import com.example.altenecom.dto.ProductDTO;
import com.example.altenecom.mapper.ProductMapper;
import com.example.altenecom.model.Product;
import com.example.altenecom.repository.ProductRepository;
import com.example.altenecom.specification.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(ProductMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = ProductMapper.toEntity(productDTO);
        return ProductMapper.toDTO(productRepository.save(product));
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Product updatedProduct = ProductMapper.toEntity(productDTO);
        updatedProduct.setId(existingProduct.getId());
        return ProductMapper.toDTO(productRepository.save(updatedProduct));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }


    public Page<ProductDTO> getProductsPaged(int page, int size, String category, Double minPrice, Double maxPrice, String name) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Product> spec = Specification.where((Specification<Product>)(root, query, cb) -> cb.conjunction())
                .and(ProductSpecification.hasCategory(category))
                .and(ProductSpecification.hasPriceBetween(minPrice, maxPrice))
                .and(ProductSpecification.hasNameLike(name));

        Page<Product> productsPage = productRepository.findAll(spec, pageable);

        List<ProductDTO> productDTOs = productsPage.getContent().stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(productDTOs, pageable, productsPage.getTotalElements());
    }
}