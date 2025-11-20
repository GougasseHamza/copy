package com.pharmfinder.service;

import com.pharmfinder.model.Pharmacy;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PharmacyService {

    private final List<Pharmacy> pharmacies;

    public PharmacyService() {
        this.pharmacies = createMockPharmacies();
    }

    public List<Pharmacy> getAllPharmacies() {
        return new ArrayList<>(pharmacies);
    }

    public List<Pharmacy> getNearbyPharmacies(Double lat, Double lon, Double radiusKm) {
        return pharmacies.stream()
                .filter(p -> {
                    double distance = calculateDistance(lat, lon,
                            p.getLocation().getLatitude(),
                            p.getLocation().getLongitude());
                    return distance <= radiusKm;
                })
                .collect(Collectors.toList());
    }

    public Pharmacy getPharmacyById(String id) {
        return pharmacies.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Pharmacy createPharmacy(Pharmacy pharmacy) {
        pharmacy.setId(String.valueOf(System.currentTimeMillis()));
        pharmacy.setCreatedAt(LocalDateTime.now());
        pharmacy.setUpdatedAt(LocalDateTime.now());
        pharmacies.add(pharmacy);
        return pharmacy;
    }

    public Pharmacy updatePharmacy(String id, Pharmacy pharmacy) {
        for (int i = 0; i < pharmacies.size(); i++) {
            if (pharmacies.get(i).getId().equals(id)) {
                pharmacy.setId(id);
                pharmacy.setUpdatedAt(LocalDateTime.now());
                pharmacies.set(i, pharmacy);
                return pharmacy;
            }
        }
        return null;
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

    private List<Pharmacy> createMockPharmacies() {
        List<Pharmacy> list = new ArrayList<>();
        Map<String, String> hours1 = new HashMap<>();
        hours1.put("monday", "08:00-20:00");
        hours1.put("tuesday", "08:00-20:00");
        hours1.put("wednesday", "08:00-20:00");
        hours1.put("thursday", "08:00-20:00");
        hours1.put("friday", "08:00-20:00");
        hours1.put("saturday", "09:00-18:00");
        hours1.put("sunday", "Fermé");

        Pharmacy p1 = new Pharmacy();
        p1.setId("1");
        p1.setName("Pharmacie Centrale");
        p1.setAddress("45 Boulevard Mohammed V");
        p1.setCity("Casablanca");
        p1.setPhone("+212 522 123456");
        p1.setEmail("contact@pharmacie-centrale.ma");
        p1.setLocation(new Pharmacy.Location(33.5731, -7.5898));
        p1.setIsOpen(true);
        p1.setRating(4.5);
        p1.setReviewCount(128);
        p1.setImageUrl("https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400");
        p1.setCreatedAt(LocalDateTime.now());
        p1.setUpdatedAt(LocalDateTime.now());
        p1.setOpeningHours(hours1);

        Pharmacy p2 = new Pharmacy();
        p2.setId("2");
        p2.setName("Pharmacie Al Amal");
        p2.setAddress("12 Rue Allal Ben Abdellah");
        p2.setCity("Casablanca");
        p2.setPhone("+212 522 234567");
        p2.setEmail("contact@pharmacie-alamal.ma");
        p2.setLocation(new Pharmacy.Location(33.5891, -7.6114));
        p2.setIsOpen(true);
        p2.setRating(4.7);
        p2.setReviewCount(95);
        p2.setImageUrl("https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400");
        p2.setCreatedAt(LocalDateTime.now());
        p2.setUpdatedAt(LocalDateTime.now());
        p2.setOpeningHours(hours1);

        Pharmacy p3 = new Pharmacy();
        p3.setId("3");
        p3.setName("Pharmacie de Nuit");
        p3.setAddress("78 Avenue Hassan II");
        p3.setCity("Casablanca");
        p3.setPhone("+212 522 345678");
        p3.setEmail("contact@pharmacie-nuit.ma");
        p3.setLocation(new Pharmacy.Location(33.5651, -7.6032));
        p3.setIsOpen(false);
        p3.setRating(4.2);
        p3.setReviewCount(64);
        p3.setImageUrl("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400");
        p3.setCreatedAt(LocalDateTime.now());
        p3.setUpdatedAt(LocalDateTime.now());
        p3.setOpeningHours(hours1);

        Pharmacy p4 = new Pharmacy();
        p4.setId("4");
        p4.setName("Pharmacie Atlas");
        p4.setAddress("23 Rue de Fès");
        p4.setCity("Casablanca");
        p4.setPhone("+212 522 456789");
        p4.setEmail("contact@pharmacie-atlas.ma");
        p4.setLocation(new Pharmacy.Location(33.5821, -7.6189));
        p4.setIsOpen(true);
        p4.setRating(4.6);
        p4.setReviewCount(112);
        p4.setImageUrl("https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400");
        p4.setCreatedAt(LocalDateTime.now());
        p4.setUpdatedAt(LocalDateTime.now());
        p4.setOpeningHours(hours1);

        Pharmacy p5 = new Pharmacy();
        p5.setId("5");
        p5.setName("Pharmacie Moderne");
        p5.setAddress("56 Boulevard Zerktouni");
        p5.setCity("Casablanca");
        p5.setPhone("+212 522 567890");
        p5.setEmail("contact@pharmacie-moderne.ma");
        p5.setLocation(new Pharmacy.Location(33.5771, -7.6321));
        p5.setIsOpen(true);
        p5.setRating(4.8);
        p5.setReviewCount(156);
        p5.setImageUrl("https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400");
        p5.setCreatedAt(LocalDateTime.now());
        p5.setUpdatedAt(LocalDateTime.now());
        p5.setOpeningHours(hours1);

        list.add(p1);
        list.add(p2);
        list.add(p3);
        list.add(p4);
        list.add(p5);
        return list;
    }
}
