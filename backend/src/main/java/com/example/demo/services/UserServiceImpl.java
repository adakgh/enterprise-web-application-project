package com.example.demo.services;

import com.example.demo.entities.UserEntity;
import com.example.demo.exceptions.GlobalException;
import com.example.demo.repositories.UserRepository;
import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.jwt.JwtProvider;
import com.example.demo.security.jwt.JwtSchema;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtProvider jwtProvider;

    public void create(UserEntity user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            String message = "An existing account was found with username: " + user.getUsername();
            throw new GlobalException(message, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public UserEntity find(String username) {
        return userRepository.findByUsername(username).orElseThrow(() ->
                new GlobalException("User not found with username: " + username, HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<JwtSchema> authenticate(String username, String password, boolean rememberMe) {
        try {
            var authToken = new UsernamePasswordAuthenticationToken(username, password);
            var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
            var userDetails = (CustomUserDetails) auth.getPrincipal();
            return ResponseEntity.ok(new JwtSchema(jwtProvider.createToken(userDetails, rememberMe)));
        } catch (AuthenticationException e) {
            String message = "Username and/or password was incorrect";
            throw new GlobalException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}
