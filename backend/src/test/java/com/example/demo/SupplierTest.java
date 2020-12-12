package com.example.demo;

import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.persistence.repositories.SupplierRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class SupplierTest {

    @Autowired
    SupplierRepository supplierRepository;

    @Test
    void checkIfCourseExists() {
        Optional<SupplierEntity> supplier = supplierRepository.findById(1l);
        System.out.println(supplier);
        assertTrue(supplier.isPresent());
    }

}
