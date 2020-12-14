package com.example.demo.models.dto;

import com.example.demo.persistence.entities.UserEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@Getter
@ResponseStatus(HttpStatus.FOUND)
public class UserResponse {

    private final String username;
    private final Map<String, Object> supplier = new HashMap<>();
    private final Map<String, Object> addresses = new HashMap<>();

    public UserResponse(UserEntity user) {
        username = user.getUsername();
        supplier.put("contactPerson", user.getSupplier().getContactPerson());
        user.getSupplier().getAddresses().forEach(e -> addresses.put("supplier", e));
    }
}
