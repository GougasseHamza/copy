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
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", null));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Product>>> searchProducts(
            @RequestParam String query,
            @RequestParam(defaultValue = "10") Integer limit
    ) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable String id) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", null));
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<ApiResponse<Object>> checkAvailability(
            @PathVariable String id,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude
    ) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", null));
    }
}
