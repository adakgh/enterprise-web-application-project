package com.example.demo.security;

import com.example.demo.security.jwt.JwtFilter;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true) // enables pre-auth on controllers
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtFilter jwtFilter;

    @Override
    public void configure(WebSecurity web) throws Exception {
        // Security filters are not applied to these resources
        // web.ignoring().antMatchers("/api/auth");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()

                // disabled for now!
                //.antMatchers("/admin/*").hasRole("ADMIN")
                //.antMatchers("/users/*").hasRole("USER")

                //.antMatchers(HttpMethod.GET, "/api/**/products", "/api/**/products/**").permitAll()
                //.antMatchers(HttpMethod.POST, "/api/*/suppliers").permitAll()
                //.antMatchers("/api/*/suppliers", "/api/*/suppliers/**", "/api/*/products").permitAll()

                .anyRequest().permitAll(); // allowing everything to test stuff!
    }
}
