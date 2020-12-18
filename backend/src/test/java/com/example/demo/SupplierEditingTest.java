package com.example.demo;

import com.example.demo.api.v1.SupplierController;
import com.example.demo.services.SupplierService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(SupplierController.class)
public class SupplierEditingTest {

    @Autowired
    private SupplierController supplierController;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SupplierService supplierService;

    @Test
    public void contectLoad(){

    }



}
