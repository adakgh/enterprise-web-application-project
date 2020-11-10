package com.example.demo.models;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class LoginCredentials {

    @NotEmpty
    private String username;
    @NotEmpty
    private String password;

    public LoginCredentials(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
