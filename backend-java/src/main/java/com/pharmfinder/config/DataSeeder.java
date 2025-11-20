package com.pharmfinder.config;

import com.pharmfinder.model.User;
import com.pharmfinder.model.UserRole;
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
        System.out.println("🌱 Seeding demo users to Firestore...");

        try {
            // Create admin user if doesn't exist
            if (!userRepository.existsByEmail("admin@pharmfinder.ma")) {
                User admin = new User();
                admin.setEmail("admin@pharmfinder.ma");
                admin.setName("Admin User");
                admin.setPhone("+212 600 000 001");
                admin.setRole(UserRole.ADMIN);
                admin.setPharmacyId(null);
                admin.setPasswordHash(passwordEncoder.encode("admin123"));
                admin.setCreatedAt(new Date());
                admin.setUpdatedAt(new Date());
                userRepository.save(admin);
                System.out.println("✅ Created admin user: admin@pharmfinder.ma / admin123");
            }

            // Create staff user if doesn't exist
            if (!userRepository.existsByEmail("staff@pharmfinder.ma")) {
                User staff = new User();
                staff.setEmail("staff@pharmfinder.ma");
                staff.setName("Staff Member");
                staff.setPhone("+212 600 000 002");
                staff.setRole(UserRole.STAFF);
                staff.setPharmacyId("1"); // Assigned to Pharmacie Centrale
                staff.setPasswordHash(passwordEncoder.encode("staff123"));
                staff.setCreatedAt(new Date());
                staff.setUpdatedAt(new Date());
                userRepository.save(staff);
                System.out.println("✅ Created staff user: staff@pharmfinder.ma / staff123");
            }

            // Create customer user if doesn't exist
            if (!userRepository.existsByEmail("customer@example.com")) {
                User customer = new User();
                customer.setEmail("customer@example.com");
                customer.setName("Customer User");
                customer.setPhone("+212 600 000 003");
                customer.setRole(UserRole.CUSTOMER);
                customer.setPharmacyId(null);
                customer.setPasswordHash(passwordEncoder.encode("customer123"));
                customer.setCreatedAt(new Date());
                customer.setUpdatedAt(new Date());
                userRepository.save(customer);
                System.out.println("✅ Created customer user: customer@example.com / customer123");
            }

            System.out.println("✅ Demo users seeding completed");
        } catch (Exception e) {
            System.err.println("⚠️ Failed to seed demo users: " + e.getMessage());
            System.err.println("This is normal if Firebase credentials are not configured.");
        }
    }
}
