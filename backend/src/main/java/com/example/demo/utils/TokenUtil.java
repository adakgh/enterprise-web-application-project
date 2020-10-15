package com.example.demo.utils;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class TokenUtil {
    private static final long TOKEN_VALIDITY = 2 * 60 * 60 * 1000; // 2 hours
    public static final String TOKEN_SECRET = "mySecretSigningKey123456789noOneWillFindOutAboutIt123456789";
    public static final String TOKEN_AUTH_HEADER = "Authorization";

    @Autowired
    UserRepository userRepository;

    public String generateToken(User user) {
        return Jwts.builder()
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
                .setSubject(user.getUsername())
                .claim("userId", user.getUserId())
                .signWith(generateSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key generateSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(TOKEN_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);

        // auto-generates a sufficiently strong <SecretKey> for use
        // with the JWT HMAC-SHA algorithms.
        // return Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public User validateToken(String token) {
        Claims claims = getClaims(token); // internal validation
        return userRepository.findByUsername(claims.getSubject());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(TokenUtil.TOKEN_SECRET)
                .build()
                .parseClaimsJws(token) // checks expirationTime
                .getBody();
    }
}
