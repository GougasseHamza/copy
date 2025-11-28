package com.pharmfinder.repository;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.pharmfinder.model.Pharmacy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Repository
@RequiredArgsConstructor
public class PharmacyRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "pharmacies";

    public Pharmacy save(Pharmacy pharmacy) throws ExecutionException, InterruptedException {
        Map<String, Object> data = new HashMap<>();
        data.put("name", pharmacy.getName());
        data.put("address", pharmacy.getAddress());
        data.put("city", pharmacy.getCity());
        data.put("phone", pharmacy.getPhone());
        data.put("email", pharmacy.getEmail());
        data.put("isOpen", pharmacy.getIsOpen());
        data.put("rating", pharmacy.getRating());
        data.put("reviewCount", pharmacy.getReviewCount());
        data.put("imageUrl", pharmacy.getImageUrl());

        // Store location as a map
        if (pharmacy.getLocation() != null) {
            Map<String, Object> location = new HashMap<>();
            location.put("latitude", pharmacy.getLocation().getLatitude());
            location.put("longitude", pharmacy.getLocation().getLongitude());
            data.put("location", location);
        }

        // Store opening hours
        if (pharmacy.getOpeningHours() != null) {
            data.put("openingHours", pharmacy.getOpeningHours());
        }

        // Store timestamps
        if (pharmacy.getCreatedAt() != null) {
            data.put("createdAt", Date.from(pharmacy.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant()));
        }
        if (pharmacy.getUpdatedAt() != null) {
            data.put("updatedAt", Date.from(pharmacy.getUpdatedAt().atZone(ZoneId.systemDefault()).toInstant()));
        }

        if (pharmacy.getId() == null || pharmacy.getId().isEmpty()) {
            // Create new document
            var docRef = firestore.collection(COLLECTION_NAME).document();
            pharmacy.setId(docRef.getId());
            data.put("id", pharmacy.getId());
            docRef.set(data).get();
        } else {
            // Update existing document
            data.put("id", pharmacy.getId());
            firestore.collection(COLLECTION_NAME).document(pharmacy.getId()).set(data).get();
        }

        return pharmacy;
    }

    public Pharmacy findById(String id) throws ExecutionException, InterruptedException {
        var doc = firestore.collection(COLLECTION_NAME).document(id).get().get();
        if (!doc.exists()) {
            return null;
        }
        return documentToPharmacy(doc.getData());
    }

    public List<Pharmacy> findAll() throws ExecutionException, InterruptedException {
        var query = firestore.collection(COLLECTION_NAME).get().get();
        List<Pharmacy> pharmacies = new ArrayList<>();
        for (var doc : query.getDocuments()) {
            pharmacies.add(documentToPharmacy(doc));
        }
        return pharmacies;
    }

    public Pharmacy findByName(String name) throws ExecutionException, InterruptedException {
        var query = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("name", name)
                .limit(1)
                .get()
                .get();

        if (query.getDocuments().isEmpty()) {
            return null;
        }

        return documentToPharmacy(query.getDocuments().get(0));
    }

    public void delete(String id) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME).document(id).delete().get();
    }

    private Pharmacy documentToPharmacy(QueryDocumentSnapshot doc) {
        return documentToPharmacy(doc.getData());
    }

    private Pharmacy documentToPharmacy(com.google.cloud.firestore.DocumentSnapshot doc) {
        return documentToPharmacy(doc.getData());
    }

    @SuppressWarnings("unchecked")
    private Pharmacy documentToPharmacy(Map<String, Object> data) {
        if (data == null) {
            return null;
        }

        Pharmacy pharmacy = new Pharmacy();
        pharmacy.setId((String) data.get("id"));
        pharmacy.setName((String) data.get("name"));
        pharmacy.setAddress((String) data.get("address"));
        pharmacy.setCity((String) data.get("city"));
        pharmacy.setPhone((String) data.get("phone"));
        pharmacy.setEmail((String) data.get("email"));
        pharmacy.setIsOpen(data.get("isOpen") != null && (Boolean) data.get("isOpen"));

        if (data.get("rating") != null) {
            pharmacy.setRating(((Number) data.get("rating")).doubleValue());
        }
        if (data.get("reviewCount") != null) {
            pharmacy.setReviewCount(((Number) data.get("reviewCount")).intValue());
        }

        pharmacy.setImageUrl((String) data.get("imageUrl"));

        // Parse location
        Map<String, Object> locationData = (Map<String, Object>) data.get("location");
        if (locationData != null) {
            Pharmacy.Location location = new Pharmacy.Location();
            if (locationData.get("latitude") != null) {
                location.setLatitude(((Number) locationData.get("latitude")).doubleValue());
            }
            if (locationData.get("longitude") != null) {
                location.setLongitude(((Number) locationData.get("longitude")).doubleValue());
            }
            pharmacy.setLocation(location);
        }

        // Parse opening hours
        Map<String, String> hours = (Map<String, String>) data.get("openingHours");
        if (hours != null) {
            pharmacy.setOpeningHours(hours);
        }

        // Parse timestamps
        if (data.get("createdAt") != null) {
            pharmacy.setCreatedAt(convertTimestamp(data.get("createdAt")));
        }
        if (data.get("updatedAt") != null) {
            pharmacy.setUpdatedAt(convertTimestamp(data.get("updatedAt")));
        }

        return pharmacy;
    }

    private LocalDateTime convertTimestamp(Object timestamp) {
        if (timestamp instanceof com.google.cloud.Timestamp) {
            return LocalDateTime.ofInstant(
                ((com.google.cloud.Timestamp) timestamp).toDate().toInstant(),
                ZoneId.systemDefault()
            );
        } else if (timestamp instanceof Date) {
            return LocalDateTime.ofInstant(
                ((Date) timestamp).toInstant(),
                ZoneId.systemDefault()
            );
        }
        return LocalDateTime.now();
    }
}
