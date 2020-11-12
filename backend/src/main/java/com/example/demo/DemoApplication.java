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

            // supplier
            var user1 = new UserEntity();
            user1.setUsername("myUsername@gmail.com");
            user1.setPassword(passwordEncoder.encode("myPassword1!"));
            user1.addRole(supplierRole);
            user1.addRole(customerRole);
            user1.addRole(adminRole);

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
            product1.setAddedDate(new Date());
            product1.addProductCategory(productCategoryRepository.getOne(1L)); // lazy load
            supp.addProduct(product1); // resolve relationship (supplier <-> product)

            var product2 = new ProductEntity();
            product2.setName("Kip filet");
            product2.setDescription("Filetlapje gemarineerd verpakt");
            product2.setQuantity("per stuk:");
            product2.setPrice(new BigDecimal("1.85"));
            product2.setAddedDate(new Date());
            product2.addProductCategory(productCategoryRepository.getOne(2L)); // lazy load
            supp.addProduct(product2); // resolve relationship (supplier <-> product)

            // save to database
            user1.setSupplier(supp);
            userRepository.save(user1);

            // -----------------------------------------------------

            // create your own supplier here...
        };
    }
}
