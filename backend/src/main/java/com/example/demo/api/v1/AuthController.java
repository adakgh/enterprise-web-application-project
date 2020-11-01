package com.example.demo.api.v1;

import com.example.demo.entities.UserEntity;
import com.example.demo.security.jwt.JwtSchema;
import com.example.demo.services.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// POST     </auth>     --> login user

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class AuthController {

    private final UserServiceImpl userService;

    @PostMapping("/auth")
    public ResponseEntity<JwtSchema> authenticateUser(@RequestBody UserEntity user) {
        return userService.authenticate(user.getUsername(), user.getPassword(), user.getRememberMe());
    }
}