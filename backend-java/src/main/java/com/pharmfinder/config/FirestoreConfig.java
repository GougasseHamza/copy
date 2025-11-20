package com.pharmfinder.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirestoreConfig {

    @Bean
    public Firestore firestore() throws IOException {
        // Check if Firebase is already initialized
        if (FirebaseApp.getApps().isEmpty()) {
            try {
                // Try to load Firebase credentials from classpath
                ClassPathResource resource = new ClassPathResource("firebase-service-account.json");
                InputStream serviceAccount = resource.getInputStream();

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();

                FirebaseApp.initializeApp(options);
                
                System.out.println("✅ Firebase initialized successfully with Firestore");
            } catch (Exception e) {
                System.err.println("⚠️ Firebase credentials not found. Running without Firestore.");
                System.err.println("To use Firestore, add firebase-service-account.json to src/main/resources/");
                throw new RuntimeException("Firebase initialization failed: " + e.getMessage());
            }
        }

        return FirestoreClient.getFirestore();
    }
}
