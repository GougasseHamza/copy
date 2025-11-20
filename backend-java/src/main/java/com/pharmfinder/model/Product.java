package com.pharmfinder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private String id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String pharmacyId;
    private String category;
    private String imageUrl;
    private String uses;
    private String disclaimer;
    private LocalDateTime createdAt;
}
