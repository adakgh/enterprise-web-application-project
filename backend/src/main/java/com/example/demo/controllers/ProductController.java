package com.example.demo.controllers;

import com.example.demo.models.Product;
import com.example.demo.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping(value = "/api/products")
    public List<Product> getAllProducts(@RequestParam(value = "id") int id) {

        // picking up id works (/api/products?id=2)
        // custom query works to find products by user-id in url

        return productRepository.findProductsByUserId(id);
    }
}
