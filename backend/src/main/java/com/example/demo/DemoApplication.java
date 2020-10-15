package com.example.demo;

import com.example.demo.models.Product;
import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Autowired private UserRepository userRepository;
    @Autowired ProductRepository productRepository;

    @Bean
    public CommandLineRunner demo() {
        return (args) -> {
            User user1 = new User("admin@gmail.com", "1234", Role.ROLE_ADMIN);
            User user2 = new User("user@gmail.com", "5678", Role.ROLE_USER);
            userRepository.save(user1);
            userRepository.save(user2);

            // create products (user2)
            Product product1 = new Product("productName1");
            product1.setUser(user2);
            productRepository.save(product1);

            Product product2 = new Product("productName2");
            product2.setUser(user2);
            productRepository.save(product2);
        };
    }
}
