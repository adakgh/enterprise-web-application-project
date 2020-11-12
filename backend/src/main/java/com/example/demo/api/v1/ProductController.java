package com.example.demo.api.v1;

import com.example.demo.models.RoleType;
import com.example.demo.persistence.entities.ProductCategoryEntity;
import com.example.demo.persistence.entities.ProductEntity;
import com.example.demo.persistence.repositories.InquiryCategoryRepository;
import com.example.demo.persistence.repositories.ProductCategoryRepository;
import com.example.demo.persistence.repositories.ProductRepository;
import com.example.demo.search.ProductSpecification;
import com.example.demo.services.ProductService;
import lombok.AllArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductService productService;
    private final ProductCategoryRepository productCategoryRepository;
    private final ModelMapper modelMapper;

    /**
     * Retrieves all products and returns them as a page object to support pagination.
     */
    @GetMapping
    public Page<ProductEntity> search(@RequestParam(required = false) Map<String, String> queryMap,
                                      @RequestParam(value = "page", required = false) Integer page,
                                      @RequestParam(value = "size", required = false) Integer size,
                                      Pageable pageable) {
        return productRepository.findAll(new ProductSpecification(queryMap), pageable);
    }

    /**
     * Creates a new product in the database.
     */
    @Secured(RoleType.SUPPLIER)
    @PostMapping
    public void createProduct(@RequestBody Map<String, String> queryMap) {
        ProductEntity product = modelMapper.map(queryMap, ProductEntity.class);
        long categoryId = Long.parseLong(queryMap.get("categoryId"));
        productService.save(product, categoryId);
    }

    /**
     * Retrieves a single product based on its given id.
     */
    @GetMapping("/{id}")
    public ProductEntity getProduct(@PathVariable long id) {
        return productService.findById(id);
    }

    /**
     * Deletes a single product based on its given id.
     */
    @Secured(RoleType.SUPPLIER)
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable long id) {
        productService.deleteById(id);
    }

    /**
     * Updates a single product based on its given id.
     */
    @Secured(RoleType.SUPPLIER)
    @PutMapping("/{id}")
    public void update(@PathVariable long id,
                       @RequestBody ProductEntity product) {
        productService.updateById(id, product);
    }

    /**
     * Retrieves all product categories.
     */
    @GetMapping("/categories")
    public List<ProductCategoryEntity> getProductCategories() {
        return productCategoryRepository.findAll();
    }
}
