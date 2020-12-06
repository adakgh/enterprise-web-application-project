package com.example.demo;

import com.example.demo.models.RoleType;
import com.example.demo.persistence.entities.*;
import com.example.demo.persistence.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Date;

@SpringBootApplication
@AllArgsConstructor
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final InquiryCategoryRepository inquiryCategoryRepository;
    private final InquiryRepository inquiryRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner init() {
        return (args) -> {

            // TODO: create all test data via schema.sql + data.sql instead of here

            // -----------------------------------------------------

            // product category
            var pCat1 = new ProductCategoryEntity();
            pCat1.setName("Groente en Fruit");
            productCategoryRepository.save(pCat1);

            var pCat2 = new ProductCategoryEntity();
            pCat2.setName("Zuivel");
            productCategoryRepository.save(pCat2);

            var pCat3 = new ProductCategoryEntity();
            pCat3.setName("Bakkerij");
            productCategoryRepository.save(pCat3);

            var pCat4 = new ProductCategoryEntity();
            pCat4.setName("Dranken");
            productCategoryRepository.save(pCat4);

            var pCat5 = new ProductCategoryEntity();
            pCat5.setName("Vlees");
            productCategoryRepository.save(pCat5);

            var pCat6 = new ProductCategoryEntity();
            pCat6.setName("Vega");
            productCategoryRepository.save(pCat6);

            var pCat7 = new ProductCategoryEntity();
            pCat7.setName("Overig");
            productCategoryRepository.save(pCat7);

            // -----------------------------------------------------

            // inquiry
            var inqType1 = new InquiryCategoryEntity();
            inqType1.setName("Nieuwe Producten");
            inquiryCategoryRepository.save(inqType1);

            var inqType2 = new InquiryCategoryEntity();
            inqType2.setName("Algemeen");
            inquiryCategoryRepository.save(inqType2);

            // example inquiry
            var inquiry = new InquiryEntity();
            inquiry.setMessage("Ik ben op zoek naar runderbotten om te gebruiken voor in de soep.");
            inquiry.addInquiryCategory(inquiryCategoryRepository.getOne(1L)); // lazy load
            inquiryRepository.save(inquiry);

            // -----------------------------------------------------

            // user roles
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

            // supplier 1
            var user1 = new UserEntity();
            user1.setUsername("myUsername@gmail.com");
            user1.setPassword(passwordEncoder.encode("myPassword1!"));
            user1.addRole(supplierRole);
            user1.addRole(customerRole);
            user1.addRole(adminRole);

            var supp1 = new SupplierEntity();
            supp1.setCompanyName("Slachterij Hooijmans");
            supp1.setContactPerson("Willem Hooijmans");
            supp1.setContactEmail("willem@gmail.com");

            // supplier address
            var supp1_addr = new SupplierAddressEntity();
            supp1_addr.setStreet("Scheerbiesstraat");
            supp1_addr.setNumber("3-A");
            supp1_addr.setPostalCode("4845 PL");
            supp1_addr.setCity("Wagenberg");
            supp1_addr.setCountry("Nederland");
            supp1.addAddress(supp1_addr);

            // supplier product
            var product1 = new ProductEntity();
            product1.setName("Tomaten");
            product1.setDescription("Grote, mooie, rode, verse tomaten uit onze tuin");
            product1.setQuantity("50 Kilogram-(KG)");
            product1.setPrice(("per kilo:4.95"));
            product1.setAddedDate(new Date());
            product1.addProductCategory(productCategoryRepository.getOne(1L)); // lazy load
            supp1.addProduct(product1); // resolve relationship (supplier <-> product)

            var product2 = new ProductEntity();
            product2.setName("Kip filet");
            product2.setDescription("Filetlapje gemarineerd verpakt");
            product2.setQuantity("50 Kilogram-(KG)");
            product2.setPrice(("per 500 gram:1.85"));
            product2.setAddedDate(new Date());
            product2.addProductCategory(productCategoryRepository.getOne(5L)); // lazy load
            supp1.addProduct(product2); // resolve relationship (supplier <-> product)

            // save to database
            user1.setSupplier(supp1);
            userRepository.save(user1);

            // -----------------------------------------------------

            // supplier 2
            var user2 = new UserEntity();
            user2.setUsername("myUsername2@gmail.com");
            user2.setPassword(passwordEncoder.encode("myPassword1!"));
            user2.addRole(supplierRole);

            var supp2 = new SupplierEntity();
            supp2.setCompanyName("Boerderij Theo Machielsen");
            supp2.setContactPerson("Theo Machielsen");
            supp2.setContactEmail("theoMachielsen@gmai.com");

            // supplier address
            var supp2_addr = new SupplierAddressEntity();
            supp2_addr.setStreet("Van Haestrechtstraat");
            supp2_addr.setNumber("9-C");
            supp2_addr.setPostalCode("4845 PL");
            supp2_addr.setCity("Kaatsheuvel");
            supp2_addr.setCountry("Nederland");
            supp2.addAddress(supp2_addr);

            // supplier product
            var product2_1 = new ProductEntity();
            product2_1.setName("Honing");
            product2_1.setDescription("100% Natuurzuivere Honing");
            product2_1.setQuantity("100 Stuk(s)");
            product2_1.setPrice(("per stuk:6.95"));
            product2_1.setAddedDate(new Date());
            product2_1.addProductCategory(productCategoryRepository.getOne(7L)); // lazy load
            supp2.addProduct(product2_1); // resolve relationship (supplier <-> product)

            var product2_2 = new ProductEntity();
            product2_2.setName("Champignons");
            product2_2.setDescription("Filetlapje gemarineerd verpakt");
            product2_2.setQuantity("25000 Gram-(G)");
            product2_2.setPrice(("per 500 gram:3.49"));
            product2_2.setAddedDate(new Date());
            product2_2.addProductCategory(productCategoryRepository.getOne(1L)); // lazy load
            supp2.addProduct(product2_2); // resolve relationship (supplier <-> product)

            var product2_3 = new ProductEntity();
            product2_3.setName("Aardbeien");
            product2_3.setDescription("De Hollandse aarbei, fris en vol van smaak!");
            product2_3.setQuantity("50 Dozen");
            product2_3.setPrice(("per doos:2.79"));
            product2_3.setAddedDate(new Date());
            product2_3.addProductCategory(productCategoryRepository.getOne(1L)); // lazy load
            supp2.addProduct(product2_3); // resolve relationship (supplier <-> product)

            var product2_4 = new ProductEntity();
            product2_4.setName("Volkoren Brood");
            product2_4.setDescription("Volkoren brood voor een lekkere, stevige boterham.");
            product2_4.setQuantity("50 Stuk(s)");
            product2_4.setPrice(("per stuk:1.25"));
            product2_4.setAddedDate(new Date());
            product2_4.addProductCategory(productCategoryRepository.getOne(3L)); // lazy load
            supp2.addProduct(product2_4); // resolve relationship (supplier <-> product)

            var product2_5 = new ProductEntity();
            product2_5.setName("Veganistische Mayonaise");
            product2_5.setDescription("Mayonaise waarbj de eierdooier is vervangen door plantaardige ingrediënten.");
            product2_5.setQuantity("145 Stuk(s)");
            product2_5.setPrice(("per stuk:1.84"));
            product2_5.setAddedDate(new Date());
            product2_5.addProductCategory(productCategoryRepository.getOne(6L)); // lazy load
            supp2.addProduct(product2_5); // resolve relationship (supplier <-> product)

            var product2_6 = new ProductEntity();
            product2_6.setName("Santpoorts Tripel");
            product2_6.setDescription("Waar alles mee begon! Dit is ons aller-eerste bier, alleen voor echte mannen!");
            product2_6.setQuantity("33 Stuk(s)");
            product2_6.setPrice(("per stuk:2.49"));
            product2_6.setAddedDate(new Date());
            product2_6.addProductCategory(productCategoryRepository.getOne(4L)); // lazy load
            supp2.addProduct(product2_6); // resolve relationship (supplier <-> product)

            // save to database
            user2.setSupplier(supp2);
            userRepository.save(user2);

            // -----------------------------------------------------

            // supplier 3
            var user3 = new UserEntity();
            user3.setUsername("myUsername3@gmail.com");
            user3.setPassword(passwordEncoder.encode("myPassword1!"));
            user3.addRole(supplierRole);
            user3.addRole(customerRole);
            user3.addRole(adminRole);

            var supp3 = new SupplierEntity();
            supp3.setCompanyName("VITAMINEHOEK DE KRAGGE");
            supp3.setContactPerson("Sonja de Kragge");
            supp3.setContactEmail("sonjaDeKraase@hotmail.com");

            // supplier address
            var supp3_addr = new SupplierAddressEntity();
            supp3_addr.setStreet("Scheerbiesstraat");
            supp3_addr.setNumber("3-A");
            supp3_addr.setPostalCode("4845 PL");
            supp3_addr.setCity("Wagenberg");
            supp3_addr.setCountry("Nederland");
            supp3.addAddress(supp3_addr);

            // supplier product
            var product3_1 = new ProductEntity();
            product3_1.setName("Geitenkaas");
            product3_1.setDescription("Honingklaver Biologische geitenkaas in blokjes in zonnebloemolie.");
            product3_1.setQuantity("500 Stuk(s)");
            product3_1.setPrice(("per stuk:6.25"));
            product3_1.setAddedDate(new Date());
            product3_1.addProductCategory(productCategoryRepository.getOne(2L)); // lazy load
            supp3.addProduct(product3_1); // resolve relationship (supplier <-> product)

            // save to database
            user3.setSupplier(supp3);
            userRepository.save(user3);

            // -----------------------------------------------------
        };
    }
}
