package com.example.demo.config;

import com.example.demo.models.User;
import com.example.demo.utils.TokenUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthFilter extends OncePerRequestFilter {

    private final TokenUtil tokenUtil;

    public AuthFilter(TokenUtil tokenUtil) {
        this.tokenUtil = tokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        try {
            String token = request.getHeader(TokenUtil.TOKEN_AUTH_HEADER);
            if (token != null) {
                User tokenDetails = tokenUtil.validateToken(token);
                if (tokenDetails != null) {
                    // TODO: unclear why a new authentication needs to be set if it's already present
                    // TODO: why do some devs set a dummy pw in the new authToken?
                    var authToken = new UsernamePasswordAuthenticationToken(tokenDetails.getUsername(), tokenDetails.getPassword());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } else {
                    SecurityContextHolder.getContext().setAuthentication(null);
                }
            }
            filterChain.doFilter(request, response); // status: 200
        } catch (Exception e) {
            /* see {@link io.jsonwebtoken.JwtParser} */
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // status: 401
        } finally {
            SecurityContextHolder.getContext().setAuthentication(null);
        }
    }
}
