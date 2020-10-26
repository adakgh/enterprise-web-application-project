package com.example.demo.api.v1;

import com.example.demo.entities.ProductEntity;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.search.ProductSpecification;
import com.example.demo.services.ProductServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// GET      </products>         --> lists   all products
// POST     </products>         --> creates single product
// DELETE   </products>         --> removes all products

// GET      </products/{id}>    --> lists   single product
// DELETE   </products/{id}>    --> removes single product
// PUT      </products/{id}>    --> updates single product

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductServiceImpl productService;

    @GetMapping("/products")
    public Page<ProductEntity> search(@RequestParam(required = false) Map<String, String> queryMap,
                                      @RequestParam(value = "page", required = false) Integer page,
                                      @RequestParam(value = "size", required = false) Integer size,
                                      Pageable pageable) {
        return productRepository.findAll(new ProductSpecification(queryMap), pageable);
    }

    @PostMapping("/products")
    public ProductEntity createProduct(@RequestBody ProductEntity product) {
        return productService.create(product);
    }

    @DeleteMapping("/products")
    public ResponseEntity<Void> deleteProducts() {
        productRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/products/{id}")
    public ProductEntity getProduct(@PathVariable long id) {
        return productService.find(id);
    }

    @DeleteMapping("/products/{id}")
    public ProductEntity deleteProduct(@PathVariable long id) {
        return productService.delete(id);
    }

    @PutMapping("/products/{id}")
    public ProductEntity updateProduct(@PathVariable long id,
                                       @RequestBody ProductEntity newData) {
        return productService.update(id, newData);
    }
}
