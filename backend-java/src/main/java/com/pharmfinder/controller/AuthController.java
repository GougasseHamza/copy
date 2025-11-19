package com.pharmfinder.controller;

import com.pharmfinder.dto.request.LoginRequest;
import com.pharmfinder.dto.request.RegisterRequest;
import com.pharmfinder.dto.response.ApiResponse;
import com.pharmfinder.dto.response.AuthResponse;
import com.pharmfinder.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Registered", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Logged in", null));
    }

    @PostMapping("/verify-token")
    public ResponseEntity<ApiResponse<Object>> verifyToken(@RequestHeader("Authorization") String token) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Valid", null));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Object>> getProfile(@RequestHeader("Authorization") String token) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", null));
    }
}
