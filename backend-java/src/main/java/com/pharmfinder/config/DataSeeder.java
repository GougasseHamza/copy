package com.pharmfinder.config;

import com.pharmfinder.model.User;
import com.pharmfinder.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("🌱 Seeding demo staff users to Firestore...");

        try {
            // Create demo staff for Pharmacie Centrale
            if (!userRepository.existsByEmail("staff1@pharmfinder.ma")) {
                User staff1 = new User();
                staff1.setEmail("staff1@pharmfinder.ma");
                staff1.setName("Ahmed Bennani");
                staff1.setPhone("+212 600 000 001");
                staff1.setPharmacyName("Pharmacie Centrale");
                staff1.setPasswordHash(passwordEncoder.encode("staff123"));
                staff1.setCreatedAt(new Date());
                staff1.setUpdatedAt(new Date());
                userRepository.save(staff1);
                System.out.println("✅ Created staff: staff1@pharmfinder.ma / staff123 (Pharmacie Centrale)");
            }

            // Create demo staff for Pharmacie du Centre
            if (!userRepository.existsByEmail("staff2@pharmfinder.ma")) {
                User staff2 = new User();
                staff2.setEmail("staff2@pharmfinder.ma");
                staff2.setName("Fatima El Amrani");
                staff2.setPhone("+212 600 000 002");
                staff2.setPharmacyName("Pharmacie du Centre");
                staff2.setPasswordHash(passwordEncoder.encode("staff123"));
                staff2.setCreatedAt(new Date());
                staff2.setUpdatedAt(new Date());
                userRepository.save(staff2);
                System.out.println("✅ Created staff: staff2@pharmfinder.ma / staff123 (Pharmacie du Centre)");
            }

            System.out.println("✅ Demo staff users seeding completed");
        } catch (Exception e) {
            System.err.println("⚠️ Failed to seed demo users: " + e.getMessage());
            System.err.println("This is normal if Firebase credentials are not configured.");
        }
    }
}
