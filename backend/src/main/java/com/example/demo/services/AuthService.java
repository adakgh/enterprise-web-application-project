package com.example.demo.services;

import com.example.demo.security.AuthenticationHandler;
import com.example.demo.security.Principal;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@AllArgsConstructor
public class AuthService {

    private final AuthenticationHandler authenticationHandler;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    /**
     * Resolves credentials contained in an HTTP authorization request header of type 'Basic'
     * and authenticates them against the database. If successful returns a fully populated
     * authenticated principal object (including authorities).
     */
    public Principal authenticateBasicCredentials(HttpServletRequest request) {
        var login = authenticationHandler.resolveBasicCredentials(request);
        var authToken = new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());
        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
        return (Principal) auth.getPrincipal();
    }
}
