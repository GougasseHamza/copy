package com.pharmfinder.dto.response;

import com.pharmfinder.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String userId;
    private String email;
    private String name;
    private UserRole role;
    private String token;
}
