package com.example.demo;

import com.example.demo.models.RoleType;
import com.example.demo.persistence.entities.*;
import com.example.demo.persistence.repositories.RoleRepository;
import com.example.demo.persistence.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@SpringBootApplication
@AllArgsConstructor
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner init() {
        return (args) -> {

            // -----------------------------------------------------

            // roles
            var adminRole = new RoleEntity();
            adminRole.setName(RoleType.ADMIN);
            roleRepository.save(adminRole);

            var supplierRole = new RoleEntity();
            supplierRole.setName(RoleType.SUPPLIER);
            roleRepository.save(supplierRole);

            var customerRole = new RoleEntity();
            customerRole.setName(RoleType.CUSTOMER);
            roleRepository.save(customerRole);

            // -----------------------------------------------------

            // supplier
            var user1 = new UserEntity();
            user1.setUsername("myUsername@gmail.com");
            user1.setPassword(passwordEncoder.encode("myPassword1!"));
            user1.addRole(supplierRole);

            var supp = new SupplierEntity();
            supp.setCompanyName("Slachterij Hooijmans");
            supp.setContactPerson("Willem Hooijmans");

            // supplier address
            var supp_addr = new SupplierAddressEntity();
            supp_addr.setStreet("Scheerbiesstraat");
            supp_addr.setNumber("3-A");
            supp_addr.setPostalCode("4845 PL");
            supp_addr.setCity("Wagenberg");
            supp_addr.setCountry("Nederland");
            supp.addAddress(supp_addr);

            // supplier product
            var product1 = new ProductEntity();
            product1.setName("Tomaten");
            product1.setDescription("Grote, mooie, rode, verse tomaten uit onze tuin");
            product1.setQuantity("per stuk:");
            product1.setPrice(new BigDecimal("4.95"));
            supp.addProduct(product1); // resolve relationship (supplier <-> product)

            var product2 = new ProductEntity();
            product2.setName("Kip filet");
            product2.setDescription("Filetlapje gemarineerd verpakt");
            product2.setQuantity("per stuk:");
            product2.setPrice(new BigDecimal("1.85"));
            supp.addProduct(product2); // resolve relationship (supplier <-> product)

            // save to database
            user1.setSupplier(supp);
            userRepository.save(user1);

            // -----------------------------------------------------

            // create your own supplier here...
        };
    }
}
