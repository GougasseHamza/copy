package com.pharmfinder.controller;

import com.pharmfinder.dto.response.ApiResponse;
import com.pharmfinder.model.Inventory;
import com.pharmfinder.model.Product;
import com.pharmfinder.model.User;
import com.pharmfinder.repository.InventoryRepository;
import com.pharmfinder.service.AuthService;
import com.pharmfinder.service.ProductService;
import com.pharmfinder.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final AuthService authService;
    private final ProductService productService;
    private final InventoryRepository inventoryRepository;
    private final JwtUtil jwtUtil;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard(
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            User user = getUserFromHeader(authHeader);

            Map<String, Object> dashboard = new HashMap<>();
            dashboard.put("userName", user.getName());
            dashboard.put("pharmacyName", user.getPharmacyName());
            dashboard.put("totalProducts", productService.getAllProducts().size());

            // Get inventory for this pharmacy
            List<Inventory> inventory = inventoryRepository.findByPharmacy(user.getPharmacyName());
            dashboard.put("inventoryCount", inventory.size());
            dashboard.put("availableCount", inventory.stream().filter(Inventory::isAvailable).count());

            return ResponseEntity.ok(new ApiResponse<>(true, "Dashboard data retrieved", dashboard));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @GetMapping("/inventory")
    public ResponseEntity<ApiResponse<List<Inventory>>> getInventory(
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            User user = getUserFromHeader(authHeader);
            List<Inventory> inventory = inventoryRepository.findByPharmacy(user.getPharmacyName());

            return ResponseEntity.ok(new ApiResponse<>(true, "Inventory retrieved", inventory));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @PostMapping("/addproduct")
    public ResponseEntity<ApiResponse<Inventory>> addProduct(
            @RequestBody Map<String, String> request,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            User user = getUserFromHeader(authHeader);
            String productId = request.get("productId");

            if (productId == null || productId.isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse<>(false, "Product ID is required", null)
                );
            }

            // Check if product exists
            Product product = productService.getProductById(productId);
            if (product == null) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse<>(false, "Product not found", null)
                );
            }

            // Check if inventory entry already exists
            Inventory existing = inventoryRepository.findByPharmacyAndProduct(user.getPharmacyName(), productId);
            if (existing != null) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse<>(false, "Product already in inventory", null)
                );
            }

            // Create new inventory entry (initially available)
            Inventory inventory = new Inventory();
            inventory.setPharmacyId(user.getPharmacyName());
            inventory.setProductId(productId);
            inventory.setAvailable(true);  // Initially available
            inventory.setLastUpdated(new Date());
            inventory.setUpdatedByUserId(user.getId());

            inventory = inventoryRepository.save(inventory);

            return ResponseEntity.ok(new ApiResponse<>(true, "Product added to inventory", inventory));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @PutMapping("/editproduct")
    public ResponseEntity<ApiResponse<Inventory>> editProduct(
            @RequestBody Map<String, Object> request,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            User user = getUserFromHeader(authHeader);
            String productId = (String) request.get("productId");
            Boolean available = (Boolean) request.get("available");

            if (productId == null || productId.isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse<>(false, "Product ID is required", null)
                );
            }

            if (available == null) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse<>(false, "Availability status is required", null)
                );
            }

            // Find inventory entry
            Inventory inventory = inventoryRepository.findByPharmacyAndProduct(user.getPharmacyName(), productId);
            if (inventory == null) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse<>(false, "Product not in inventory. Add it first.", null)
                );
            }

            // Toggle availability
            inventory.setAvailable(available);
            inventory.setLastUpdated(new Date());
            inventory.setUpdatedByUserId(user.getId());

            inventory = inventoryRepository.save(inventory);

            return ResponseEntity.ok(new ApiResponse<>(true, "Product availability updated", inventory));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @GetMapping("/products")
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) String search
    ) {
        try {
            User user = getUserFromHeader(authHeader);

            List<Product> products;
            if (search != null && !search.isEmpty()) {
                products = productService.searchProducts(search, 100);
            } else {
                products = productService.getAllProducts();
            }

            return ResponseEntity.ok(new ApiResponse<>(true, "Products retrieved", products));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    private User getUserFromHeader(String authHeader) {
        String token = extractToken(authHeader);
        return authService.getUserFromToken(token);
    }

    private String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        throw new RuntimeException("Invalid authorization header");
    }
}
