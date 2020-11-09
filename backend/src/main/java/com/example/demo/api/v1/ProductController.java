package com.example.demo.api.v1;

import com.example.demo.entities.ProductEntity;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// GET      </products>         --> lists   all products
// POST     </products>         --> creates single product
// DELETE   </products>         --> removes all products

// GET      </products/{id}>    --> lists   single product
// DELETE   </products/{id}>    --> removes single product
// PUT      </products/{id}>    --> updates single product

@RestController
@RequestMapping("/api/v1")
public class ProductController {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/products")
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/products")
    public void addProduct(@RequestBody ProductEntity product) {
        var user = userRepository.findByUsername("admin").get();
        user.getProducts().add(product);
        product.setUser(user);
        userRepository.save(user);
    }
}
