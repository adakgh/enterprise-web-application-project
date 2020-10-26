package com.example.demo.security.jwt;

import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.CustomUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String TOKEN_HEADER = "Authorization";

    @Value("${security.jwt.signing-key}")
    private String tokenSigningKey;
    @Value("${security.jwt.validity}")
    private long tokenValidity;
    @Value("${security.jwt.validity-remember-me}")
    private long tokenValidityRememberMe;

    private final ModelMapper modelMapper;
    private final CustomUserDetailsService customUserDetailsService;

    public String createToken(CustomUserDetails user, boolean rememberMe) {
        return Jwts.builder()
                   .setSubject(user.getUsername())
                   .setExpiration(getExpirationTime(rememberMe))
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .claim("roles", modelMapper.map(user.getAuthorities(), String[].class))
                   .signWith(createSigningKey(), SignatureAlgorithm.HS256)
                   .compact();
    }

    public String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader(TOKEN_HEADER);
        return StringUtils.hasText(bearer) && bearer.startsWith(TOKEN_PREFIX)
                ? bearer.substring(TOKEN_PREFIX.length())
                : null;
    }

    public Authentication authenticateToken(String token) {
        var userDetails = customUserDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public boolean isValidToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException
                | SignatureException | IllegalArgumentException e) {
            // TODO: 422 unprocessable entity
            e.printStackTrace();
        }
        return false;
    }

    private String getUsername(String token) {
        return parseToken(token).getBody().getSubject();
    }

    private Date getExpirationTime(boolean rememberMe) {
        long tokenTimeMillis = rememberMe ? tokenValidityRememberMe : tokenValidity;
        return new Date(System.currentTimeMillis() + tokenTimeMillis);
    }

    private Key createSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenSigningKey));
    }

    private Jws<Claims> parseToken(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(tokenSigningKey)
                   .build()
                   .parseClaimsJws(token);
    }
}
