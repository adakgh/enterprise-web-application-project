package com.example.demo;

import com.example.demo.api.v1.SupplierController;
import com.example.demo.exceptions.ResourceNotFoundException;
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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.client.RestClientException;

import java.io.IOException;
import java.util.Optional;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.*;
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
    private SupplierService supplierService;

    /**
     * Get first supplier from controller and check if it is not null and if the endpoint works
     */
    @Test
    void returnFirstSupplierViaControllerEndPointNotNull() {
        SupplierEntity retrievedSupplier = this.restTemplate.getForObject("/api/v1/suppliers/1", SupplierEntity.class);
        assertNotNull(retrievedSupplier);
    }

    /**
     * Get supplier from service/repository that does not exist, check for right exception and response
     */
    @Test
    void returnSupplierThatDoesNotExist() {
        long nonExistingSupplierId = -1;
        try {
            SupplierEntity retrievedSupplier = supplierService.findById(nonExistingSupplierId);
            // If the supplier is not null fail the test
            assertNull(retrievedSupplier);
        } catch (Exception e) {
            // Check if the thrown exception is equal to ResourceNotFoundException if supplier is not found
            assertTrue(e.getClass().equals(ResourceNotFoundException.class));

            // Check if the exception message is as expected
            assertEquals("Supplier not be found with id: " + nonExistingSupplierId, e.getMessage());
        }
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
     * Retrieve first supplier with the use of the supplierservice/repository.
     * Update some data and try to update the supplier with the use of the controller without an image
     * And when done with the test reset all data as it was, so we dont actually change the data on the system
     */
/*    @Test
    @DirtiesContext
    void updateSupplierOneWithoutImage() throws IOException {

        // Get the first supplier with the use of the service
        SupplierEntity supplierToUpdate = supplierService.findById(1l);
        // SupplierEntity retrievedSupplier = this.restTemplate.getForObject("http://localhost:" + port + "/api/v1" +
        // "/suppliers/1", SupplierEntity.class);

        // Update some data, but not the image
        supplierToUpdate.setCompanyName(supplierToUpdate.getCompanyName() + "-UPDATED");
        supplierToUpdate.setContactPerson(supplierToUpdate.getContactPerson() + "-UPDATED");

        SupplierImage updatedSupplier = new SupplierImage(supplierToUpdate, null, null, null);

        System.out.println(updatedSupplier);

        try {
            HttpEntity<SupplierImage> httpEntity = new HttpEntity<>(updatedSupplier);
            this.restTemplate.exchange("/api/v1/suppliers/", HttpMethod.PUT, httpEntity, Boolean.class);
            // When the try does not fail we know the test worked successfully and we can let the test succeed
            System.out.println(supplierService.findById(1l));
            assertTrue(true);
        } catch (ClassCastException e) {
            System.out.println(e.getMessage());
            // If we come here we know the update failed and then we also fail the entire test
            assertFalse(true);
        }

*//*        boolean updatedSupplier = supplierService.updateWithImage(new SupplierImage(supplierToUpdate, null, null,
        null));
        assertTrue(updatedSupplier);*//*
    }*/

    /*@Test
    void updateSupplierOneWithImage() {

    }*/

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
