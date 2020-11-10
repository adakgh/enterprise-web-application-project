package com.example.demo.security.jwt;

import com.example.demo.security.AuthenticationHandler;
import com.example.demo.security.Principal;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final AuthenticationHandler authenticationHandler;
    private final JwtProvider jwtProvider;

    /**
     * Filters access-tokens and does stateless authentication in the current security context
     * to allow access to this server's resources.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String token = authenticationHandler.getBearerTokenFromRequest(request);

        if (token != null) {
            var claims = jwtProvider.validateToken(token).getBody();
            var principal = new Principal(claims);
            var auth = new UsernamePasswordAuthenticationToken(principal, token, principal.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }
}
