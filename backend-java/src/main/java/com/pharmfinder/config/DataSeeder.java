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
            // Create main demo staff
            if (!userRepository.existsByEmail("staff@pharmfinder.ma")) {
                User staff = new User();
                staff.setEmail("staff@pharmfinder.ma");
                staff.setName("Ahmed Bennani");
                staff.setPhone("+212 600 000 001");
                staff.setPharmacyName("Pharmacie Centrale");
                staff.setPasswordHash(passwordEncoder.encode("staff123"));
                staff.setCreatedAt(new Date());
                staff.setUpdatedAt(new Date());
                userRepository.save(staff);
                System.out.println("✅ Created staff: staff@pharmfinder.ma / staff123 (Pharmacie Centrale)");
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
