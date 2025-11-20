package com.pharmfinder.controller;

import com.pharmfinder.dto.response.ApiResponse;
import com.pharmfinder.model.Pharmacy;
import com.pharmfinder.model.Product;
import com.pharmfinder.model.User;
import com.pharmfinder.model.UserRole;
import com.pharmfinder.service.AuthService;
import com.pharmfinder.service.PharmacyService;
import com.pharmfinder.service.ProductService;
import com.pharmfinder.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final AuthService authService;
    private final PharmacyService pharmacyService;
    private final ProductService productService;
    private final JwtUtil jwtUtil;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard(
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            User user = getUserFromHeader(authHeader);
            if (user.getRole() != UserRole.STAFF && user.getRole() != UserRole.ADMIN) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ApiResponse<>(false, "Access denied", null)
                );
            }

            Map<String, Object> dashboard = new HashMap<>();
            dashboard.put("totalPharmacies", pharmacyService.getAllPharmacies().size());
            dashboard.put("totalProducts", productService.getAllProducts().size());
            dashboard.put("userRole", user.getRole());
            dashboard.put("pharmacyId", user.getPharmacyId());

            if (user.getPharmacyId() != null) {
                Pharmacy pharmacy = pharmacyService.getPharmacyById(user.getPharmacyId());
                dashboard.put("myPharmacy", pharmacy);
            }

            return ResponseEntity.ok(new ApiResponse<>(true, "Dashboard data retrieved", dashboard));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @GetMapping("/pharmacy/{id}")
    public ResponseEntity<ApiResponse<Pharmacy>> getPharmacyDetails(
            @PathVariable String id,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            User user = getUserFromHeader(authHeader);
            if (user.getRole() != UserRole.STAFF && user.getRole() != UserRole.ADMIN) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ApiResponse<>(false, "Access denied", null)
                );
            }

            // Staff can only view their assigned pharmacy
            if (user.getRole() == UserRole.STAFF && !id.equals(user.getPharmacyId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ApiResponse<>(false, "You can only view your assigned pharmacy", null)
                );
            }

            Pharmacy pharmacy = pharmacyService.getPharmacyById(id);
            if (pharmacy == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(new ApiResponse<>(true, "Pharmacy details retrieved", pharmacy));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @PutMapping("/pharmacy/{id}")
    public ResponseEntity<ApiResponse<Pharmacy>> updatePharmacy(
            @PathVariable String id,
            @RequestBody Pharmacy pharmacy,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            User user = getUserFromHeader(authHeader);
            if (user.getRole() != UserRole.STAFF && user.getRole() != UserRole.ADMIN) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ApiResponse<>(false, "Access denied", null)
                );
            }

            // Staff can only update their assigned pharmacy
            if (user.getRole() == UserRole.STAFF && !id.equals(user.getPharmacyId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ApiResponse<>(false, "You can only update your assigned pharmacy", null)
                );
            }

            Pharmacy updated = pharmacyService.updatePharmacy(id, pharmacy);
            if (updated == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(new ApiResponse<>(true, "Pharmacy updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @GetMapping("/products")
    public ResponseEntity<ApiResponse<List<Product>>> getProducts(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) String search
    ) {
        try {
            User user = getUserFromHeader(authHeader);
            if (user.getRole() != UserRole.STAFF && user.getRole() != UserRole.ADMIN) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ApiResponse<>(false, "Access denied", null)
                );
            }

            List<Product> products;
            if (search != null && !search.isEmpty()) {
                products = productService.searchProducts(search, 100);
            } else {
                products = productService.getAllProducts();
            }

            // If staff, filter products by their pharmacy
            if (user.getRole() == UserRole.STAFF && user.getPharmacyId() != null) {
                products = products.stream()
                        .filter(p -> user.getPharmacyId().equals(p.getPharmacyId()))
                        .toList();
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
