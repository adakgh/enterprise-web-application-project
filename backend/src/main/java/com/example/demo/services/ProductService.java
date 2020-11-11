package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.entities.ProductEntity;
import com.example.demo.persistence.entities.UserEntity;
import com.example.demo.persistence.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Service
@AllArgsConstructor
public class ProductService {

    private final EntityManager entityManager;
    private final ModelMapper modelmapper;
    private final ProductRepository productRepository;
    private final UserService userService;

    public ProductEntity findById(long id) {
        return productRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Product not found with id: " + id));
    }

    public void deleteById(long id) {
        // TODO: allow only product removals belonging to user.
        productRepository.deleteById(id);
    }

    public void save(ProductEntity product) {
        UserEntity user = userService.getCurrentUser();
        product.setSupplier(user.getSupplier());
        productRepository.save(product);
    }

    public void updateById(long id, ProductEntity newProduct) {
        ProductEntity currentProduct = entityManager.getReference(ProductEntity.class, id);
        modelmapper.map(newProduct, currentProduct); // new --> updateInto --> current
        productRepository.save(currentProduct);
    }
}
