package com.example.demo.security.jwt;

import lombok.Data;

@Data
public class JwtSchema {

    private final String tokenType;
    private final String idToken;

    public JwtSchema(String idToken) {
        this.tokenType = "Bearer";
        this.idToken = idToken;
    }
}
