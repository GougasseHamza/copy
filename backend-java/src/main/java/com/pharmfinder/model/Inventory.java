package com.pharmfinder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    private String id;
    private String pharmacyId;
    private String productId;
    private Integer quantity;
    private Integer minStockLevel;
    private LocalDateTime lastUpdated;
    private String lastUpdatedBy;
}
