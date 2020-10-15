package com.example.demo.models;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue
    @Getter @Setter private long userId;
    @Getter @Setter private String username;
    @Getter @Setter private String password;

    @Enumerated(EnumType.STRING)
    @Getter @Setter private Role role;

    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}