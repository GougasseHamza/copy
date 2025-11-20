package com.pharmfinder.controller;

import com.pharmfinder.dto.request.LoginRequest;
import com.pharmfinder.dto.request.RegisterRequest;
import com.pharmfinder.dto.response.ApiResponse;
import com.pharmfinder.dto.response.AuthResponse;
import com.pharmfinder.model.User;
import com.pharmfinder.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Registration successful", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @PostMapping("/verify-token")
    public ResponseEntity<ApiResponse<Boolean>> verifyToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = extractToken(authHeader);
            boolean isValid = authService.verifyToken(token);
            return ResponseEntity.ok(new ApiResponse<>(true, "Token validated", isValid));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse<>(false, "Invalid token", false));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = extractToken(authHeader);
            User user = authService.getUserFromToken(token);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse<>(false, "User not found", null)
                );
            }
            return ResponseEntity.ok(new ApiResponse<>(true, "Profile retrieved", user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(false, e.getMessage(), null)
            );
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        // Since we're using stateless JWT, logout is handled client-side by removing the token
        return ResponseEntity.ok(new ApiResponse<>(true, "Logged out successfully", null));
    }

    private String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        throw new RuntimeException("Invalid authorization header");
    }
}
