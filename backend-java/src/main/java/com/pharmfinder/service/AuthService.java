package com.pharmfinder.service;

import com.pharmfinder.dto.request.LoginRequest;
import com.pharmfinder.dto.request.RegisterRequest;
import com.pharmfinder.dto.response.AuthResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public AuthResponse register(RegisterRequest request) {
        // TODO: Implement Firebase Auth registration
        return null;
    }

    public AuthResponse login(LoginRequest request) {
        // TODO: Implement Firebase Auth login
        return null;
    }

    public boolean verifyToken(String token) {
        // TODO: Implement Firebase token verification
        return false;
    }
}
