package com.pharmfinder.repository;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.pharmfinder.model.User;
import com.pharmfinder.model.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "users";

    public User save(User user) throws ExecutionException, InterruptedException {
        Map<String, Object> userData = new HashMap<>();
        userData.put("email", user.getEmail());
        userData.put("name", user.getName());
        userData.put("phone", user.getPhone());
        userData.put("role", user.getRole().name());
        userData.put("pharmacyId", user.getPharmacyId());
        userData.put("passwordHash", user.getPasswordHash());
        userData.put("createdAt", user.getCreatedAt());
        userData.put("updatedAt", user.getUpdatedAt());

        if (user.getId() == null || user.getId().isEmpty()) {
            // Create new user with auto-generated ID
            var docRef = firestore.collection(COLLECTION_NAME).document();
            user.setId(docRef.getId());
            userData.put("id", user.getId());
            docRef.set(userData).get();
        } else {
            // Update existing user
            userData.put("id", user.getId());
            firestore.collection(COLLECTION_NAME).document(user.getId()).set(userData).get();
        }

        return user;
    }

    public User findByEmail(String email) throws ExecutionException, InterruptedException {
        var query = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("email", email)
                .limit(1)
                .get()
                .get();

        if (query.getDocuments().isEmpty()) {
            return null;
        }

        return documentToUser(query.getDocuments().get(0));
    }

    public User findById(String id) throws ExecutionException, InterruptedException {
        var doc = firestore.collection(COLLECTION_NAME).document(id).get().get();
        
        if (!doc.exists()) {
            return null;
        }

        return documentToUser(doc);
    }

    public boolean existsByEmail(String email) throws ExecutionException, InterruptedException {
        return findByEmail(email) != null;
    }

    private User documentToUser(QueryDocumentSnapshot doc) {
        return documentToUser(doc.getData());
    }

    private User documentToUser(com.google.cloud.firestore.DocumentSnapshot doc) {
        return documentToUser(doc.getData());
    }

    private User documentToUser(Map<String, Object> data) {
        if (data == null) {
            return null;
        }

        User user = new User();
        user.setId((String) data.get("id"));
        user.setEmail((String) data.get("email"));
        user.setName((String) data.get("name"));
        user.setPhone((String) data.get("phone"));
        user.setRole(UserRole.valueOf((String) data.get("role")));
        user.setPharmacyId((String) data.get("pharmacyId"));
        user.setPasswordHash((String) data.get("passwordHash"));

        // Handle timestamps
        if (data.get("createdAt") != null) {
            user.setCreatedAt(convertTimestamp(data.get("createdAt")));
        }
        if (data.get("updatedAt") != null) {
            user.setUpdatedAt(convertTimestamp(data.get("updatedAt")));
        }

        return user;
    }

    private Date convertTimestamp(Object timestamp) {
        if (timestamp instanceof com.google.cloud.Timestamp) {
            return ((com.google.cloud.Timestamp) timestamp).toDate();
        } else if (timestamp instanceof Date) {
            return (Date) timestamp;
        }
        return new Date();
    }
}
