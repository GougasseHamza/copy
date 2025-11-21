package com.pharmfinder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    private String id;
    private String pharmacyName;  // Changed from pharmacyId to pharmacyName
    private String productId;
    private boolean available;  // Simple toggle: available or not
    private Date lastUpdated;
    private String updatedByUserId;
}
