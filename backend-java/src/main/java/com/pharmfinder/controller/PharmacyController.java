package com.pharmfinder.controller;

import com.pharmfinder.dto.response.ApiResponse;
import com.pharmfinder.model.Pharmacy;
import com.pharmfinder.service.PharmacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
@RequiredArgsConstructor
public class PharmacyController {

    private final PharmacyService pharmacyService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Pharmacy>>> getAllPharmacies(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Boolean isOpen
    ) {
        List<Pharmacy> pharmacies = pharmacyService.getAllPharmacies();
        
        // Filter by city if provided
        if (city != null && !city.isEmpty()) {
            pharmacies = pharmacies.stream()
                    .filter(p -> p.getCity().equalsIgnoreCase(city))
                    .toList();
        }
        
        // Filter by isOpen if provided
        if (isOpen != null) {
            pharmacies = pharmacies.stream()
                    .filter(p -> p.getIsOpen().equals(isOpen))
                    .toList();
        }
        
        return ResponseEntity.ok(new ApiResponse<>(true, "Pharmacies retrieved successfully", pharmacies));
    }

    @GetMapping("/nearby")
    public ResponseEntity<ApiResponse<List<Pharmacy>>> getNearbyPharmacies(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "5") Double radius
    ) {
        List<Pharmacy> pharmacies = pharmacyService.getNearbyPharmacies(latitude, longitude, radius);
        return ResponseEntity.ok(new ApiResponse<>(true, "Nearby pharmacies retrieved successfully", pharmacies));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Pharmacy>> getPharmacyById(@PathVariable String id) {
        Pharmacy pharmacy = pharmacyService.getPharmacyById(id);
        if (pharmacy == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Pharmacy retrieved successfully", pharmacy));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Pharmacy>> createPharmacy(@RequestBody Pharmacy pharmacy) {
        Pharmacy created = pharmacyService.createPharmacy(pharmacy);
        return ResponseEntity.ok(new ApiResponse<>(true, "Pharmacy created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Pharmacy>> updatePharmacy(
            @PathVariable String id,
            @RequestBody Pharmacy pharmacy
    ) {
        Pharmacy updated = pharmacyService.updatePharmacy(id, pharmacy);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Pharmacy updated successfully", updated));
    }
}
