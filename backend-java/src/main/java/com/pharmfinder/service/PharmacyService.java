package com.pharmfinder.service;

import com.pharmfinder.model.Pharmacy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PharmacyService {

    public List<Pharmacy> getAllPharmacies() {
        // TODO: Implement Firestore query
        return null;
    }

    public List<Pharmacy> getNearbyPharmacies(Double lat, Double lon, Double radius) {
        // TODO: Implement geolocation query
        return null;
    }

    public Pharmacy getPharmacyById(String id) {
        // TODO: Implement Firestore get
        return null;
    }

    public Pharmacy createPharmacy(Pharmacy pharmacy) {
        // TODO: Implement Firestore create
        return null;
    }

    public Pharmacy updatePharmacy(String id, Pharmacy pharmacy) {
        // TODO: Implement Firestore update
        return null;
    }
}
