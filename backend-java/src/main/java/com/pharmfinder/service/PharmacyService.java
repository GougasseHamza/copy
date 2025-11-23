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

        // Real pharmacies in Rabat, Morocco

        // 1. Pharmacie Minaret - Agdal area
        Pharmacy p1 = new Pharmacy();
        p1.setId("1");
        p1.setName("Pharmacie Minaret");
        p1.setAddress("16 Avenue du 16 Novembre, Agdal");
        p1.setCity("Rabat");
        p1.setPhone("+212 537 671234");
        p1.setEmail("contact@pharmacie-minaret.ma");
        p1.setLocation(new Pharmacy.Location(33.9716, -6.8498));
        p1.setIsOpen(true);
        p1.setRating(4.6);
        p1.setReviewCount(142);
        p1.setImageUrl("https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400");
        p1.setCreatedAt(LocalDateTime.now());
        p1.setUpdatedAt(LocalDateTime.now());
        p1.setOpeningHours(standardHours);

        // 2. Pharmacie des Facultés - Near University
        Pharmacy p2 = new Pharmacy();
        p2.setId("2");
        p2.setName("Pharmacie des Facultés");
        p2.setAddress("Avenue Omar Ibn Khattab, Agdal");
        p2.setCity("Rabat");
        p2.setPhone("+212 537 672345");
        p2.setEmail("contact@pharmacie-facultes.ma");
        p2.setLocation(new Pharmacy.Location(33.9700, -6.8520));
        p2.setIsOpen(true);
        p2.setRating(4.5);
        p2.setReviewCount(98);
        p2.setImageUrl("https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400");
        p2.setCreatedAt(LocalDateTime.now());
        p2.setUpdatedAt(LocalDateTime.now());
        p2.setOpeningHours(standardHours);

        // 3. Pharmacie Najmi - Hassan district
        Pharmacy p3 = new Pharmacy();
        p3.setId("3");
        p3.setName("Pharmacie Najmi");
        p3.setAddress("8 Rue Al Mouahidine, Hassan");
        p3.setCity("Rabat");
        p3.setPhone("+212 537 203456");
        p3.setEmail("contact@pharmacie-najmi.ma");
        p3.setLocation(new Pharmacy.Location(34.0209, -6.8247));
        p3.setIsOpen(true);
        p3.setRating(4.7);
        p3.setReviewCount(167);
        p3.setImageUrl("https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400");
        p3.setCreatedAt(LocalDateTime.now());
        p3.setUpdatedAt(LocalDateTime.now());
        p3.setOpeningHours(nightHours);

        // 4. Pharmacie Al Khair - Central Rabat
        Pharmacy p4 = new Pharmacy();
        p4.setId("4");
        p4.setName("Pharmacie Al Khair");
        p4.setAddress("49 Avenue Sidi Mohammed Ben Abdellah");
        p4.setCity("Rabat");
        p4.setPhone("+212 537 204567");
        p4.setEmail("contact@pharmacie-alkhair.ma");
        p4.setLocation(new Pharmacy.Location(34.0100, -6.8370));
        p4.setIsOpen(true);
        p4.setRating(4.4);
        p4.setReviewCount(89);
        p4.setImageUrl("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400");
        p4.setCreatedAt(LocalDateTime.now());
        p4.setUpdatedAt(LocalDateTime.now());
        p4.setOpeningHours(standardHours);

        // 5. Pharmacie Moujamaa Andalous - Avenue Mohammed V
        Pharmacy p5 = new Pharmacy();
        p5.setId("5");
        p5.setName("Pharmacie Moujamaa Andalous");
        p5.setAddress("75 Boulevard Mohammed V");
        p5.setCity("Rabat");
        p5.setPhone("+212 537 205678");
        p5.setEmail("contact@pharmacie-andalous.ma");
        p5.setLocation(new Pharmacy.Location(34.0181, -6.8350));
        p5.setIsOpen(true);
        p5.setRating(4.8);
        p5.setReviewCount(203);
        p5.setImageUrl("https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400");
        p5.setCreatedAt(LocalDateTime.now());
        p5.setUpdatedAt(LocalDateTime.now());
        p5.setOpeningHours(standardHours);

        // 6. Pharmacie Mohssine - Hassan district
        Pharmacy p6 = new Pharmacy();
        p6.setId("6");
        p6.setName("Pharmacie Mohssine");
        p6.setAddress("45 Avenue Moulay Ismail, Hassan");
        p6.setCity("Rabat");
        p6.setPhone("+212 537 206789");
        p6.setEmail("contact@pharmacie-mohssine.ma");
        p6.setLocation(new Pharmacy.Location(34.0220, -6.8265));
        p6.setIsOpen(false);
        p6.setRating(4.3);
        p6.setReviewCount(76);
        p6.setImageUrl("https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400");
        p6.setCreatedAt(LocalDateTime.now());
        p6.setUpdatedAt(LocalDateTime.now());
        p6.setOpeningHours(standardHours);

        // 7. Pharmacie Moustaid - Gare Agdal
        Pharmacy p7 = new Pharmacy();
        p7.setId("7");
        p7.setName("Pharmacie Moustaid");
        p7.setAddress("Gare Rabat Agdal");
        p7.setCity("Rabat");
        p7.setPhone("+212 537 673890");
        p7.setEmail("contact@pharmacie-moustaid.ma");
        p7.setLocation(new Pharmacy.Location(33.9705, -6.8485));
        p7.setIsOpen(true);
        p7.setRating(4.5);
        p7.setReviewCount(112);
        p7.setImageUrl("https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400");
        p7.setCreatedAt(LocalDateTime.now());
        p7.setUpdatedAt(LocalDateTime.now());
        p7.setOpeningHours(standardHours);

        list.add(p1);
        list.add(p2);
        list.add(p3);
        list.add(p4);
        list.add(p5);
        list.add(p6);
        list.add(p7);
        return list;
    }
}
