package com.pharmfinder.service;

import com.pharmfinder.dto.request.LoginRequest;
import com.pharmfinder.dto.request.RegisterRequest;
import com.pharmfinder.dto.response.AuthResponse;
import com.pharmfinder.model.User;
import com.pharmfinder.model.UserRole;
import com.pharmfinder.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final Map<String, User> users = new HashMap<>(); // In-memory storage
    private final Map<String, String> passwords = new HashMap<>(); // Email -> Password

    public AuthService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        // Create demo users
        createDemoUsers();
    }

    private void createDemoUsers() {
        // Admin user
        User admin = new User();
        admin.setId("1");
        admin.setEmail("admin@pharmfinder.ma");
        admin.setName("Admin User");
        admin.setPhone("+212 600 000 001");
        admin.setRole(UserRole.ADMIN);
        admin.setPharmacyId(null);
        admin.setCreatedAt(LocalDateTime.now());
        admin.setUpdatedAt(LocalDateTime.now());
        users.put(admin.getEmail(), admin);
        passwords.put(admin.getEmail(), "admin123");

        // Staff user
        User staff = new User();
        staff.setId("2");
        staff.setEmail("staff@pharmfinder.ma");
        staff.setName("Staff Member");
        staff.setPhone("+212 600 000 002");
        staff.setRole(UserRole.STAFF);
        staff.setPharmacyId("1"); // Assigned to Pharmacie Centrale
        staff.setCreatedAt(LocalDateTime.now());
        staff.setUpdatedAt(LocalDateTime.now());
        users.put(staff.getEmail(), staff);
        passwords.put(staff.getEmail(), "staff123");

        // Customer user
        User customer = new User();
        customer.setId("3");
        customer.setEmail("customer@example.com");
        customer.setName("Customer User");
        customer.setPhone("+212 600 000 003");
        customer.setRole(UserRole.CUSTOMER);
        customer.setPharmacyId(null);
        customer.setCreatedAt(LocalDateTime.now());
        customer.setUpdatedAt(LocalDateTime.now());
        users.put(customer.getEmail(), customer);
        passwords.put(customer.getEmail(), "customer123");
    }

    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (users.containsKey(request.getEmail())) {
            throw new RuntimeException("User already exists");
        }

        // Create new user
        User user = new User();
        user.setId(String.valueOf(System.currentTimeMillis()));
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setRole(request.getRole() != null ? request.getRole() : UserRole.CUSTOMER);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        users.put(user.getEmail(), user);
        passwords.put(user.getEmail(), request.getPassword());

        // Generate token
        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

        return new AuthResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole(),
                token
        );
    }

    public AuthResponse login(LoginRequest request) {
        // Validate credentials
        User user = users.get(request.getEmail());
        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }

        String storedPassword = passwords.get(request.getEmail());
        if (!request.getPassword().equals(storedPassword)) {
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
    }

    public boolean verifyToken(String token) {
        return jwtUtil.validateToken(token);
    }

    public User getUserFromToken(String token) {
        String email = jwtUtil.extractEmail(token);
        return users.get(email);
    }

    public User getUserById(String userId) {
        return users.values().stream()
                .filter(u -> u.getId().equals(userId))
                .findFirst()
                .orElse(null);
    }
}
