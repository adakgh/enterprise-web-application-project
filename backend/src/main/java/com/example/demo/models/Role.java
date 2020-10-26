package com.example.demo.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Role {
    @JsonProperty("admin")
    ROLE_ADMIN("admin"),
    @JsonProperty("user")
    ROLE_USER("user");

    private final String name;

    Role(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
