package com.pharmfinder.service;

import com.pharmfinder.dto.request.LoginRequest;
import com.pharmfinder.dto.request.RegisterRequest;
import com.pharmfinder.dto.response.AuthResponse;
import com.pharmfinder.model.Pharmacy;
import com.pharmfinder.model.User;
import com.pharmfinder.repository.UserRepository;
import com.pharmfinder.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PharmacyService pharmacyService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse register(RegisterRequest request) {
        try {
            // Check if user already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("User already exists");
            }

            // Create new user (staff)
            User user = new User();
            user.setEmail(request.getEmail());
            user.setName(request.getName());
            user.setPhone(request.getPhone());
            user.setPharmacyName(request.getPharmacyName());
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            user.setCreatedAt(new Date());
            user.setUpdatedAt(new Date());

            // Save to Firestore
            user = userRepository.save(user);

            // Create corresponding pharmacy entity
            if (request.getPharmacyName() != null && !request.getPharmacyName().isEmpty()) {
                Pharmacy pharmacy = new Pharmacy();
                pharmacy.setName(request.getPharmacyName());
                pharmacy.setPhone(request.getPhone() != null ? request.getPhone() : "");
                pharmacy.setEmail(request.getEmail());
                pharmacy.setCity("Rabat"); // Default city, can be updated later
                pharmacy.setAddress(""); // Can be updated later by pharmacy owner
                pharmacy.setIsOpen(true);
                pharmacy.setRating(0.0);
                pharmacy.setReviewCount(0);
                pharmacy.setImageUrl("https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400");

                // Set default location (Rabat center)
                Pharmacy.Location location = new Pharmacy.Location();
                location.setLatitude(34.0209);
                location.setLongitude(-6.8416);
                pharmacy.setLocation(location);

                // Set default opening hours
                Map<String, String> hours = new HashMap<>();
                hours.put("monday", "08:00-20:00");
                hours.put("tuesday", "08:00-20:00");
                hours.put("wednesday", "08:00-20:00");
                hours.put("thursday", "08:00-20:00");
                hours.put("friday", "08:00-20:00");
                hours.put("saturday", "09:00-18:00");
                hours.put("sunday", "Fermé");
                pharmacy.setOpeningHours(hours);

                pharmacyService.createPharmacy(pharmacy);
            }

            // Generate token
            String token = jwtUtil.generateToken(user.getId(), user.getEmail());

            return new AuthResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getPharmacyName(),
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
            String token = jwtUtil.generateToken(user.getId(), user.getEmail());

            return new AuthResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getPharmacyName(),
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
