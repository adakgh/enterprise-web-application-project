package com.example.demo;

import com.example.demo.entities.ProductEntity;
import com.example.demo.entities.SupplierEntity;
import com.example.demo.models.Role;
import com.example.demo.entities.UserEntity;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.UserRepository;
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

            // -------------------------------------------

            UserEntity user1 = new UserEntity();
            user1.setUsername("rindemans");
            user1.setPassword(passwordEncoder.encode("1234"));
            user1.addRole(Role.ROLE_ADMIN, Role.ROLE_USER);

            var supplier = new SupplierEntity();
            supplier.setContactPerson("Nordwuar Tromp");
            user1.setSupplier(supplier);
            userRepository.save(user1);

            // -------------------------------------------

            UserEntity foundUser = userRepository.findByUsername("rindemans").get();

            ProductEntity product1 = new ProductEntity();
            product1.setName("tomatoes");
            product1.setPrice("123.99");
            product1.setUser(foundUser);
            productRepository.save(product1);

            ProductEntity product2 = new ProductEntity();
            product2.setName("bananas");
            product2.setPrice("46.95");
            product2.setUser(foundUser);
            productRepository.save(product2);

            ProductEntity product3 = new ProductEntity();
            product3.setName("coconuts");
            product3.setPrice("9.99");
            product3.setUser(foundUser);
            productRepository.save(product3);

            ProductEntity product4 = new ProductEntity();
            product4.setName("turnips");
            product4.setPrice("2.95");
            product4.setUser(foundUser);
            productRepository.save(product4);

            //System.out.println(foundUser);
            //userRepository.delete(foundUser);
        };
    }
}
