package com.pharmfinder.repository;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.pharmfinder.model.Inventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
@RequiredArgsConstructor
public class InventoryRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "inventory";

    public Inventory save(Inventory inventory) throws ExecutionException, InterruptedException {
        Map<String, Object> data = new HashMap<>();
        data.put("pharmacyName", inventory.getPharmacyName());
        data.put("productId", inventory.getProductId());
        data.put("available", inventory.isAvailable());
        data.put("lastUpdated", inventory.getLastUpdated());
        data.put("updatedByUserId", inventory.getUpdatedByUserId());

        if (inventory.getId() == null || inventory.getId().isEmpty()) {
            var docRef = firestore.collection(COLLECTION_NAME).document();
            inventory.setId(docRef.getId());
            data.put("id", inventory.getId());
            docRef.set(data).get();
        } else {
            data.put("id", inventory.getId());
            firestore.collection(COLLECTION_NAME).document(inventory.getId()).set(data).get();
        }

        return inventory;
    }

    public Inventory findByPharmacyAndProduct(String pharmacyName, String productId) throws ExecutionException, InterruptedException {
        var query = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("pharmacyName", pharmacyName)
                .whereEqualTo("productId", productId)
                .limit(1)
                .get()
                .get();

        if (query.getDocuments().isEmpty()) {
            return null;
        }

        return documentToInventory(query.getDocuments().get(0));
    }

    public List<Inventory> findByPharmacy(String pharmacyName) throws ExecutionException, InterruptedException {
        var query = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("pharmacyName", pharmacyName)
                .get()
                .get();

        List<Inventory> inventories = new ArrayList<>();
        for (var doc : query.getDocuments()) {
            inventories.add(documentToInventory(doc));
        }
        return inventories;
    }

    public List<Inventory> findByProduct(String productId) throws ExecutionException, InterruptedException {
        var query = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("productId", productId)
                .get()
                .get();

        List<Inventory> inventories = new ArrayList<>();
        for (var doc : query.getDocuments()) {
            inventories.add(documentToInventory(doc));
        }
        return inventories;
    }

    public boolean isProductAvailable(String productId) throws ExecutionException, InterruptedException {
        var query = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("productId", productId)
                .whereEqualTo("available", true)
                .limit(1)
                .get()
                .get();

        return !query.getDocuments().isEmpty();
    }

    private Inventory documentToInventory(QueryDocumentSnapshot doc) {
        return documentToInventory(doc.getData());
    }

    private Inventory documentToInventory(com.google.cloud.firestore.DocumentSnapshot doc) {
        return documentToInventory(doc.getData());
    }

    private Inventory documentToInventory(Map<String, Object> data) {
        if (data == null) {
            return null;
        }

        Inventory inventory = new Inventory();
        inventory.setId((String) data.get("id"));
        inventory.setPharmacyName((String) data.get("pharmacyName"));
        inventory.setProductId((String) data.get("productId"));
        inventory.setAvailable(data.get("available") != null && (Boolean) data.get("available"));
        inventory.setUpdatedByUserId((String) data.get("updatedByUserId"));

        if (data.get("lastUpdated") != null) {
            inventory.setLastUpdated(convertTimestamp(data.get("lastUpdated")));
        }

        return inventory;
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
