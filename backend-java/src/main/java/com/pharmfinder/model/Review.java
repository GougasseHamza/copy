package com.pharmfinder.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private String id;
    private String pharmacyId;
    private String userId;
    private String userName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}
