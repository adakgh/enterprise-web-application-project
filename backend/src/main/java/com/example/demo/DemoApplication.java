package com.example.demo;

import com.example.demo.entities.ProductEntity;
import com.example.demo.entities.UserEntity;
import com.example.demo.models.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableScheduling
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    // ------------------------------------------------------

    // TODO: create a beanProvider class for this

    @Bean
    public ModelMapper modelMapper() {
        var mapper = new ModelMapper();
        mapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        return mapper;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ------------------------------------------------------

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner init() {
        return (args) -> {

            UserEntity user = new UserEntity();
            user.setPassword("test");
            user.setUsername("admin");

            var product = new ProductEntity();
            product.setPrice("5");
            product.setName("bloemkool");

            var product1 = new ProductEntity();
            product1.setPrice("4");
            product1.setName("bananen");

            user.getProducts().add(product);
            user.getProducts().add(product1);
            product.setUser(user);
            product1.setUser(user);
            userRepository.save(user);
        };
    }
}
