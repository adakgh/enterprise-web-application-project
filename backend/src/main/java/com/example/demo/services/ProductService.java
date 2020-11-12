package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.entities.ProductEntity;
import com.example.demo.persistence.entities.UserEntity;
import com.example.demo.persistence.repositories.ProductCategoryRepository;
import com.example.demo.persistence.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
import java.util.Date;

@Service
@AllArgsConstructor
public class ProductService {

    private final EntityManager entityManager;
    private final ModelMapper modelmapper;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final UserService userService;

    public ProductEntity findById(long id) {
        return productRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Product not found with id: " + id));
    }

    public void deleteById(long id) {
        // TODO: allow only product removals belonging to user.
        productRepository.deleteById(id);
    }

    public void save(ProductEntity product, long categoryId) {
        UserEntity user = userService.getCurrentUser();
        product.setSupplier(user.getSupplier());
        product.setAddedDate(new Date());
        product.addProductCategory(productCategoryRepository.getOne(categoryId));
        productRepository.save(product);
    }

    public void updateById(long id, ProductEntity newProduct) {
        ProductEntity currentProduct = entityManager.getReference(ProductEntity.class, id);
        modelmapper.map(newProduct, currentProduct); // new --> updateInto --> current
        productRepository.save(currentProduct);
    }
}
