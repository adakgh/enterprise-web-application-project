package com.example.demo.security.jwt;

import com.example.demo.exceptions.ExpiredTokenException;
import com.example.demo.exceptions.InvalidTokenException;
import com.example.demo.persistence.entities.RoleEntity;
import com.example.demo.persistence.entities.UserEntity;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtProvider {

    @Value("${security.jwt.expiration-access}")
    private long accessExpTime;

    @Value("${security.jwt.key-secret}")
    private String secretKey;

    /**
     * Creates an access token with no sensitive data exposure. Note that HS256 is used as the
     * signing algorithm, but is nowadays not commonly used anymore, because it can be brute-forced
     * and is build upon a single secret key that could be shared among multiple servers which is
     * undesirable. RS256 solves these problems, but is out of the scope of this project.
     */
    public String createAccessToken(UserEntity user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(generateExpirationTime(accessExpTime, false))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .claim("uid", user.getId())
                .claim("roles", user.getRoles().stream().map(RoleEntity::getName).collect(Collectors.joining(",")))
                .signWith(generateSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validates the specified token's signature and throws appropriate exceptions based on
     * its failed validation.
     */
    public Jws<Claims> validateToken(String token) {
        try {
            return parseTokenSignature(token);
        } catch (ExpiredJwtException e) {
            throw new ExpiredTokenException(e.getMessage());
        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
            throw new InvalidTokenException(e.getMessage());
        }
    }

    /**
     * Same as {@link JwtProvider#validateToken(String)} with the exception that the mentioned
     * method handles all thrown exceptions properly.
     */
    public Jws<Claims> parseTokenSignature(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
    }

    /**
     * Retrieves all claims from a token.
     */
    public Claims resolveTokenClaims(String token) {
        return parseTokenSignature(token).getBody();
    }

    /**
     * Generates a custom expiration time based on the given arguments.
     */
    private Date generateExpirationTime(long expirationTime, boolean rememberMe) {
        // TODO: extend time if rememberMe == true
        return new Date(System.currentTimeMillis() + expirationTime);
    }

    /**
     * Creates a new secret key instance for use with HMAC-SHA algorithms
     */
    private Key generateSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }
}

//    public Map<?, ?> readTokenClaims(String token) throws JsonProcessingException {
//        token = token.substring(token.indexOf(".") + 1);
//        token = token.substring(0, token.indexOf("."));
//        String jsonNode = new String(Base64.getDecoder().decode(token));
//
//        var mapper = new ObjectMapper();
//        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        return mapper.readValue(jsonNode, Map.class);
//    }