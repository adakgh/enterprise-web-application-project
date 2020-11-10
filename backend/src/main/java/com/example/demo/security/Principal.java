package com.example.demo.security;

import com.example.demo.persistence.entities.RoleEntity;
import com.example.demo.persistence.entities.UserEntity;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@AllArgsConstructor
public class Principal extends UserEntity implements UserDetails {

    public Principal(Claims claims) {
        super.setId(((Number) claims.get("uid")).longValue());
        super.setUsername(claims.getSubject());
        super.setPassword(""); // no pw available from claims
        super.setRoles(Arrays.stream(claims.get("roles").toString().split(","))
                .map(RoleEntity::new)
                .collect(Collectors.toSet()));
    }

    public Principal(UserEntity user) {
        super.setId(user.getId());
        super.setUsername(user.getUsername());
        super.setPassword(user.getPassword());
        super.setRoles(user.getRoles());
        super.setSupplier(user.getSupplier());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return super.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
