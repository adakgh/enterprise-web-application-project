package com.example.demo;

import com.example.demo.api.v1.SupplierController;
import com.example.demo.persistence.SupplierImage;
import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.persistence.repositories.SupplierRepository;
import com.example.demo.services.SupplierService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.IOException;
import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Omer Citik
 * Test the supplier entity, controller and repository
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@WebMvcTest(SupplierController.class)
class SupplierTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private SupplierController supplierController;

    /*@Autowired
    private MockMvc mockMvc;*/

    @Autowired
    private SupplierService supplierService;

    /**
     * Get first supplier from controller and check if it is not null
     */
    @Test
    void returnFirstSupplierViaControllerEndPointNotNull() {
        SupplierEntity retrievedSupplier = this.restTemplate.getForObject("http://localhost:" + port + "/api/v1" +
                "/suppliers/1", SupplierEntity.class);
        assertNotNull(retrievedSupplier);
    }

    /**
     * Get first supplier from controller and check if we also get the products of the supplier
     */
    @Test
    void checkIfTheProductsAreAlsoRetrievedWithSupplier() {
        SupplierEntity retrievedSupplier = this.restTemplate.getForObject("http://localhost:" + port + "/api/v1" +
                "/suppliers/1", SupplierEntity.class);
        assertTrue(retrievedSupplier.getProducts().size() >= 1);
    }

    /**
     * Retrieve first supplier, update some data and try to update with the supplier without an image
     */
    @Test
    @DirtiesContext
    void updateSupplierOneWithoutImage() throws IOException {
        SupplierEntity retrievedSupplier = this.restTemplate.getForObject("http://localhost:" + port + "/api/v1" +
                "/suppliers/1", SupplierEntity.class);
        retrievedSupplier.setCompanyName(retrievedSupplier.getCompanyName() + "-UPDATED");
        retrievedSupplier.setContactPerson(retrievedSupplier.getContactPerson() + "-UPDATED");

        boolean updatedSupplier = supplierService.updateWithImage(new SupplierImage(retrievedSupplier, null, null, null));
        assertTrue(updatedSupplier);
    }

    @Test
    void updateSupplierOneWithImage() {

    }

    /*    @Test
    void updateSupplierOneNameAndEmail() throws Exception {

        // Get first supplier with the supplierRepository
//        Optional<SupplierEntity> supplierToEdit = supplierRepository.findById(1l);
        SupplierEntity supplierToEdit = new SupplierEntity();

        // Edit the values of the supplier
        supplierToEdit.setCompanyName(supplierToEdit.getCompanyName() + " - UPDATED");
        supplierToEdit.setContactEmail(supplierToEdit.getContactEmail() + " - UPDATED");
        SupplierImage updatedSupplier = new SupplierImage(supplierToEdit, null, null, null);

        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.put("/api/v1/suppliers/", updatedSupplier);
        this.mockMvc.perform(builder).andExpect(MockMvcResultMatchers.status().isOk());

        this.mockMvc.perform(get("/api/v1/suppliers/", updatedSupplier)).andDo(print()).andExpect(status().isOk());


//        boolean lol = this.restTemplate.getForObject("http://localhost:" + port + "/api/v1/suppliers", Boolean.class);
        System.out.println(supplierToEdit);
//        assertTrue(supplierToEdit.isPresent());
    }*/

}
