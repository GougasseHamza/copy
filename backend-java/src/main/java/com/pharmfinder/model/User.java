package com.pharmfinder.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String id;
    private String email;
    private String name;
    private String phone;
    private String pharmacyName;  // Name of pharmacy they manage

    @JsonIgnore  // Never send password hash to client
    private String passwordHash;

    private Date createdAt;
    private Date updatedAt;
}
