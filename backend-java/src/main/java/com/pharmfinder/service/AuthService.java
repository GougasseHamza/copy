package com.pharmfinder.service;

import com.pharmfinder.dto.request.LoginRequest;
import com.pharmfinder.dto.request.RegisterRequest;
import com.pharmfinder.dto.response.AuthResponse;
import com.pharmfinder.model.User;
import com.pharmfinder.model.UserRole;
import com.pharmfinder.repository.UserRepository;
import com.pharmfinder.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse register(RegisterRequest request) {
        try {
            // Check if user already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("User already exists");
            }

            // Create new user
            User user = new User();
            user.setEmail(request.getEmail());
            user.setName(request.getName());
            user.setRole(request.getRole() != null ? request.getRole() : UserRole.CUSTOMER);
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            user.setCreatedAt(new Date());
            user.setUpdatedAt(new Date());

            // Save to Firestore
            user = userRepository.save(user);

            // Generate token
            String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

            return new AuthResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getRole(),
                    token
            );
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException("Failed to register user: " + e.getMessage(), e);
        }
    }

    public AuthResponse login(LoginRequest request) {
        try {
            // Find user by email
            User user = userRepository.findByEmail(request.getEmail());
            if (user == null) {
                throw new RuntimeException("Invalid credentials");
            }

            // Verify password
            if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                throw new RuntimeException("Invalid credentials");
            }

            // Generate token
            String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

            return new AuthResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getRole(),
                    token
            );
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException("Failed to login: " + e.getMessage(), e);
        }
    }

    public boolean verifyToken(String token) {
        return jwtUtil.validateToken(token);
    }

    public User getUserFromToken(String token) {
        try {
            String email = jwtUtil.extractEmail(token);
            return userRepository.findByEmail(email);
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException("Failed to get user: " + e.getMessage(), e);
        }
    }

    public User getUserById(String userId) {
        try {
            return userRepository.findById(userId);
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException("Failed to get user: " + e.getMessage(), e);
        }
    }
}
