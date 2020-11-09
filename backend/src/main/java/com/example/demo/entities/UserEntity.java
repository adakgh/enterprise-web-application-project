package com.example.demo.entities;

import com.example.demo.models.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Entity(name = "user")
@Table(name = "tbl_user")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class UserEntity {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;
    private String password;

    @Transient
    @JsonProperty("remember_me")
    private Boolean rememberMe;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "tbl_user_role")
    @ElementCollection(fetch = FetchType.EAGER)
    Set<Role> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductEntity> products = new ArrayList<>();

    public void addRole(Role... roles) {
        Collections.addAll(this.roles, roles);
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ProductEntity> getProducts() {
        return products;
    }
}
