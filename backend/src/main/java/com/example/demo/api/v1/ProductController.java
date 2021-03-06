package com.example.demo.api.v1;

import com.example.demo.models.RoleType;
import com.example.demo.models.dto.ProductDto;
import com.example.demo.persistence.entities.DiscountPriceEntity;
import com.example.demo.persistence.entities.ImageEntity;
import com.example.demo.persistence.entities.ProductCategoryEntity;
import com.example.demo.persistence.entities.ProductEntity;
import com.example.demo.persistence.repositories.ProductCategoryRepository;
import com.example.demo.services.ProductService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;
    private final ProductCategoryRepository productCategoryRepository;
    private final ModelMapper modelMapper;

    /**
     * Retrieves all products and returns them as a page object to support pagination.
     */
    @GetMapping
    public Page<ProductDto> search(@RequestParam(required = false) Map<String, String> queryMap,
                                   @RequestParam(value = "page", required = false) Integer page,
                                   @RequestParam(value = "size", required = false) Integer size,
                                   Pageable pageable) {
        return productService.searchAll(queryMap, pageable);
    }

    /**
     * Creates a new product in the database.
     */
    @Secured(RoleType.SUPPLIER)
    @PostMapping
    public void createProduct(@RequestBody ObjectNode queryMap) {
        productService.save(queryMap);
    }

    /**
     * Retrieves a single product based on its given id.
     */
    @GetMapping("/{id}")
    public ProductEntity getProduct(@PathVariable long id) {
        ProductEntity product = productService.findById(id);
        product.getCustomData().put("supplierId", product.getSupplier().getId());
        product.getDiscounts().sort(new Comparator<DiscountPriceEntity>() {
            @Override
            public int compare(DiscountPriceEntity t1, DiscountPriceEntity t2) {
                return t1.getDiscountPrice().compareTo(t2.getDiscountPrice());
            }
        });
        return product;
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
    public void update(@PathVariable long id, @RequestBody ObjectNode product) {
        productService.update(id, product);
    }

    /**
     * Retrieves all product categories.
     */
    @GetMapping("/categories")
    public List<ProductCategoryEntity> getProductCategories() {
        return productCategoryRepository.findAll();
    }
}
