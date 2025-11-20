package com.pharmfinder.controller;

import com.pharmfinder.dto.response.ApiResponse;
import com.pharmfinder.model.Product;
import com.pharmfinder.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search
    ) {
        List<Product> products = productService.getAllProducts();
        
        // Filter by category if provided
        if (category != null && !category.isEmpty()) {
            products = products.stream()
                    .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(category))
                    .toList();
        }
        
        // Search if search param provided
        if (search != null && !search.isEmpty()) {
            products = productService.searchProducts(search, 100);
        }
        
        return ResponseEntity.ok(new ApiResponse<>(true, "Products retrieved successfully", products));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Product>>> searchProducts(
            @RequestParam String query,
            @RequestParam(defaultValue = "10") Integer limit
    ) {
        List<Product> products = productService.searchProducts(query, limit);
        return ResponseEntity.ok(new ApiResponse<>(true, "Search completed successfully", products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Product retrieved successfully", product));
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<ApiResponse<Object>> checkAvailability(
            @PathVariable String id,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude
    ) {
        // TODO: Implement availability check logic
        // For now, return mock response
        return ResponseEntity.ok(new ApiResponse<>(true, "Availability check completed", 
                java.util.Map.of("available", true, "pharmacies", java.util.List.of())));
    }
}
