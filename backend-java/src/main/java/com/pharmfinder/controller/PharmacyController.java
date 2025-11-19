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
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", null));
    }

    @GetMapping("/nearby")
    public ResponseEntity<ApiResponse<List<Pharmacy>>> getNearbyPharmacies(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "5") Double radius
    ) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Pharmacy>> getPharmacyById(@PathVariable String id) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Success", null));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Pharmacy>> createPharmacy(@RequestBody Pharmacy pharmacy) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Created", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Pharmacy>> updatePharmacy(
            @PathVariable String id,
            @RequestBody Pharmacy pharmacy
    ) {
        // TODO: Implement
        return ResponseEntity.ok(new ApiResponse<>(true, "Updated", null));
    }
}
