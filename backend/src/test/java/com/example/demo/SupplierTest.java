package com.example.demo;

import com.example.demo.api.v1.SupplierController;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.SupplierImage;
import com.example.demo.persistence.entities.ImageEntity;
import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.persistence.repositories.ImageRepository;
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

    @Autowired
    private ImageRepository imageRepository;

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
    @Test
    @DirtiesContext
    void updateSupplierOneWithoutImage() throws Exception {

        // Get the first supplier with the use of the service
        SupplierEntity supplierToUpdate = supplierService.findById(1l);

        // Another way to get the supplier, by doing a request in the restcontroller
        // SupplierEntity retrievedSupplier = this.restTemplate.getForObject("http://localhost:" + port + "/api/v1/suppliers/1", SupplierEntity.class);

        // Update the CompanyName and The contact persons name but no images
        supplierToUpdate.setCompanyName(supplierToUpdate.getCompanyName() + "-UPDATED");
        supplierToUpdate.setContactPerson(supplierToUpdate.getContactPerson() + "-UPDATED");

        // A helper class that holds the information of the supplier and Image, in this case we dont have a image
        SupplierImage updatedSupplier = new SupplierImage(supplierToUpdate, null, null, null);

        try {
            // Do a PUT request for updating the supplier
            HttpEntity<SupplierImage> httpEntity = new HttpEntity<>(updatedSupplier);
            this.restTemplate.exchange("/api/v1/suppliers/", HttpMethod.PUT, httpEntity, Boolean.class);

            // When the try does not fail we know the test worked successfully and we can let the test succeed
            SupplierEntity editedSupplier = supplierService.findById(1l);

            assertTrue(editedSupplier.getCompanyName().endsWith("UPDATED"));
            assertTrue(editedSupplier.getContactPerson().endsWith("UPDATED"));
            assertTrue(true);
        } catch (Exception e) {
            // If we come here we know the update failed and then we also fail the entire test
            throw new Exception(e);
            /*assertFalse(true);*/
        }
    }

    /**
     * Retrieve first supplier with the use of the supplierservice/repository.
     * Update some data and try to update the supplier with the use of the controller without an image
     * And when done with the test reset all data as it was, so we dont actually change the data on the system
     */
    @Test
    @DirtiesContext
    void updateSupplierOneWithImage() throws Exception {

        // Get the first supplier with the use of the service
        SupplierEntity supplierToUpdate = supplierService.findById(1l);

        // Update some data but this time also update/add an image
        supplierToUpdate.setCompanyName(supplierToUpdate.getCompanyName() + "-UPDATED");
        supplierToUpdate.setContactPerson(supplierToUpdate.getContactPerson() + "-UPDATED");

        // Base64 url of the image for the supplier
        String imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOMAAADeCAMAAAD4tEcNAAAAh1BMVEUAAAD+/v7" +
                "////t7e3s7Oz4+Pj09PTw8PD7+/v29vby8vIxMTE2NjYpKSk6Ojrn5+ff39+4uLjGxsaSkpKEhISgoKDT09Onp6dvb2+vr6" +
                "/a2tpUVFR" +
                "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";

        // A helper class that holds the information of the supplier and Image
        SupplierImage updatedSupplier = new SupplierImage(supplierToUpdate, "supplierTestImage", "image/png", imageUrl);

        try {
            // Do a PUT request for updating the supplier
            HttpEntity<SupplierImage> httpEntity = new HttpEntity<>(updatedSupplier);
            this.restTemplate.exchange("/api/v1/suppliers/", HttpMethod.PUT, httpEntity, Boolean.class);

            // When the try does not fail we know the test worked successfully and we can let the test succeed
            SupplierEntity editedSupplier = supplierService.findById(1l);
            ImageEntity imageEntity = imageRepository.findById(1l).get();

            assertTrue(editedSupplier.getProfileImage() != null);
            assertTrue(imageEntity != null);
            assertTrue(true);

        } catch (Exception e) {
            // If we come here we know the update failed and then we also fail the entire test
            throw new Exception(e);
        }
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
