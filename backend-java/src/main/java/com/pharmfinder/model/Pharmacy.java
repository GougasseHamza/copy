package com.pharmfinder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pharmacy {
    private String id;
    private String name;
    private String address;
    private String city;
    private String phone;
    private String email;
    private Location location;
    private Boolean isOpen;
    private Map<String, String> openingHours;
    private Double rating;
    private Integer reviewCount;
    private String imageUrl;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Location {
        private Double latitude;
        private Double longitude;
    }
}
