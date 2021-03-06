package com.example.demo.exceptions.handlers;

import com.example.demo.exceptions.ExpiredTokenException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * By default, filter exceptions are not handled by global exception components
 * with an 'advice' annotation. In order to delegate these exceptions to a
 * global handler, a custom filter is required (must be first in chain!) that
 * redirects them. See {@link com.example.demo.config.WebSecurityConfig}
 */

@Component
@AllArgsConstructor
public class FilterExceptionHandler extends OncePerRequestFilter {

    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) {
        try {
            filterChain.doFilter(request, response);
        } catch (ExpiredTokenException e) {
            handlerExceptionResolver.resolveException(request, response, null, e);
        } catch (ServletException | IOException e) {
            e.printStackTrace();
        }
    }
}
