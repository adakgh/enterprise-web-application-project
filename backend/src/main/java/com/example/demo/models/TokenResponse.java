package com.example.demo.models;

import lombok.Data;

@Data
public class TokenResponse {
    private String token;
    private long userId;
    private String username;
    private String status;
    private Role role;

    public TokenResponse(String token, User user, String status) {
        this.token = token;
        this.userId = user.getUserId();
        this.username = user.getUsername();
        this.role = user.getRole();
        this.status = status;
    }

    public TokenResponse(String status) {
        this.status = status;
    }
}
