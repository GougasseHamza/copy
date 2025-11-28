package com.pharmfinder.service;

import com.pharmfinder.model.Pharmacy;
import com.pharmfinder.repository.PharmacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;

    public List<Pharmacy> getAllPharmacies() {
        try {
            List<Pharmacy> pharmacies = pharmacyRepository.findAll();

            // If no pharmacies exist, initialize with mock data
            if (pharmacies.isEmpty()) {
                pharmacies = initializeMockPharmacies();
            }

            return pharmacies;
        } catch (Exception e) {
            throw new RuntimeException("Failed to get pharmacies: " + e.getMessage(), e);
        }
    }

    public List<Pharmacy> getNearbyPharmacies(Double lat, Double lon, Double radiusKm) {
        return getAllPharmacies().stream()
                .filter(p -> {
                    double distance = calculateDistance(lat, lon,
                            p.getLocation().getLatitude(),
                            p.getLocation().getLongitude());
                    return distance <= radiusKm;
                })
                .collect(Collectors.toList());
    }

    public Pharmacy getPharmacyById(String id) {
        try {
            return pharmacyRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get pharmacy: " + e.getMessage(), e);
        }
    }

    public Pharmacy createPharmacy(Pharmacy pharmacy) {
        try {
            pharmacy.setCreatedAt(LocalDateTime.now());
            pharmacy.setUpdatedAt(LocalDateTime.now());
            return pharmacyRepository.save(pharmacy);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create pharmacy: " + e.getMessage(), e);
        }
    }

    public Pharmacy updatePharmacy(String id, Pharmacy pharmacy) {
        try {
            Pharmacy existing = pharmacyRepository.findById(id);
            if (existing == null) {
                return null;
            }
            pharmacy.setId(id);
            pharmacy.setUpdatedAt(LocalDateTime.now());
            if (pharmacy.getCreatedAt() == null) {
                pharmacy.setCreatedAt(existing.getCreatedAt());
            }
            return pharmacyRepository.save(pharmacy);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update pharmacy: " + e.getMessage(), e);
        }
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }

    private List<Pharmacy> initializeMockPharmacies() {
        List<Pharmacy> mockPharmacies = createMockPharmacies();

        // Save all mock pharmacies to Firestore
        for (Pharmacy pharmacy : mockPharmacies) {
            try {
                pharmacyRepository.save(pharmacy);
            } catch (Exception e) {
                System.err.println("Failed to save mock pharmacy: " + e.getMessage());
            }
        }

        return mockPharmacies;
    }

    private List<Pharmacy> createMockPharmacies() {
        // Standard pharmacy hours
        Map<String, String> standardHours = new HashMap<>();
        standardHours.put("monday", "08:00-20:00");
        standardHours.put("tuesday", "08:00-20:00");
        standardHours.put("wednesday", "08:00-20:00");
        standardHours.put("thursday", "08:00-20:00");
        standardHours.put("friday", "08:00-20:00");
        standardHours.put("saturday", "09:00-18:00");
        standardHours.put("sunday", "Fermé");

        // 24/7 pharmacy hours
        Map<String, String> nightHours = new HashMap<>();
        nightHours.put("monday", "24h/24");
        nightHours.put("tuesday", "24h/24");
        nightHours.put("wednesday", "24h/24");
        nightHours.put("thursday", "24h/24");
        nightHours.put("friday", "24h/24");
        nightHours.put("saturday", "24h/24");
        nightHours.put("sunday", "24h/24");

        // Create mock pharmacies
        return List.of(
            createPharmacy("1", "Pharmacie Minaret", "16 Avenue du 16 Novembre, Agdal", "Rabat",
                    "+212 537 671234", "contact@pharmacie-minaret.ma", 33.9716, -6.8498,
                    true, 4.6, 142, "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400",
                    standardHours),

            createPharmacy("2", "Pharmacie des Facultés", "Avenue Omar Ibn Khattab, Agdal", "Rabat",
                    "+212 537 672345", "contact@pharmacie-facultes.ma", 33.9700, -6.8520,
                    true, 4.5, 98, "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
                    standardHours),

            createPharmacy("3", "Pharmacie Najmi", "8 Rue Al Mouahidine, Hassan", "Rabat",
                    "+212 537 203456", "contact@pharmacie-najmi.ma", 34.0209, -6.8247,
                    true, 4.7, 167, "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
                    nightHours),

            createPharmacy("4", "Pharmacie Al Khair", "49 Avenue Sidi Mohammed Ben Abdellah", "Rabat",
                    "+212 537 204567", "contact@pharmacie-alkhair.ma", 34.0100, -6.8370,
                    true, 4.4, 89, "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
                    standardHours),

            createPharmacy("5", "Pharmacie Moujamaa Andalous", "75 Boulevard Mohammed V", "Rabat",
                    "+212 537 205678", "contact@pharmacie-andalous.ma", 34.0181, -6.8350,
                    true, 4.8, 203, "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400",
                    standardHours),

            createPharmacy("6", "Pharmacie Mohssine", "45 Avenue Moulay Ismail, Hassan", "Rabat",
                    "+212 537 206789", "contact@pharmacie-mohssine.ma", 34.0220, -6.8265,
                    false, 4.3, 76, "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
                    standardHours),

            createPharmacy("7", "Pharmacie Moustaid", "Gare Rabat Agdal", "Rabat",
                    "+212 537 673890", "contact@pharmacie-moustaid.ma", 33.9705, -6.8485,
                    true, 4.5, 112, "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
                    standardHours)
        );
    }

    private Pharmacy createPharmacy(String id, String name, String address, String city,
                                   String phone, String email, double lat, double lon,
                                   boolean isOpen, double rating, int reviewCount,
                                   String imageUrl, Map<String, String> hours) {
        Pharmacy p = new Pharmacy();
        p.setId(id);
        p.setName(name);
        p.setAddress(address);
        p.setCity(city);
        p.setPhone(phone);
        p.setEmail(email);
        p.setLocation(new Pharmacy.Location(lat, lon));
        p.setIsOpen(isOpen);
        p.setRating(rating);
        p.setReviewCount(reviewCount);
        p.setImageUrl(imageUrl);
        p.setCreatedAt(LocalDateTime.now());
        p.setUpdatedAt(LocalDateTime.now());
        p.setOpeningHours(hours);
        return p;
    }
}
