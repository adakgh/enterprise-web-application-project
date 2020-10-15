package com.example.demo.controllers;

import com.example.demo.models.TokenResponse;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.utils.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private TokenUtil tokenUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = "/api/login")
    public TokenResponse login(@RequestBody User request) {

        try {
            var authToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
            var auth = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (DisabledException | LockedException | BadCredentialsException e) {
            // TODO: send corresponding status response of exception
            return new TokenResponse("INVALID");
        }

        final User user = userRepository.findByUsername(request.getUsername());
        if (user != null) {
            String token = tokenUtil.generateToken(user);
            return new TokenResponse(token, user, "SUCCESS");
        }
        return new TokenResponse("INVALID");
    }
}
