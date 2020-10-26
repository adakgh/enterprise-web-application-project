package com.example.demo.services;

import com.example.demo.entities.ProductEntity;
import com.example.demo.entities.UserEntity;
import com.example.demo.exceptions.GlobalException;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

// TODO: add interface for this implementation
// TODO: why does a retrieved object from entityManager add 'hibernateLazyInitializer' on serialization?
// TODO: restrict user to remove/add only its own products
// TODO: is it more efficient to use entityManager for an update?

@Service
@AllArgsConstructor
public class ProductServiceImpl {

    private final ProductRepository productRepository;
    private final UserServiceImpl userService;
    private final UserRepository userRepository;
    private final EntityManager entityManager;
    private final ModelMapper modelmapper;

    public ProductEntity create(ProductEntity product) {
        product.setUser(getUserEntityFromContext());
        return productRepository.save(product);
    }

    public ProductEntity find(long id) {
        return productRepository.findById(id).orElseThrow(() ->
                new GlobalException("Product not found with id: " + id, HttpStatus.NOT_FOUND));
    }

    public ProductEntity delete(long id) {
        var product = entityManager.getReference(ProductEntity.class, id);
        var user = product.getUser();
        user.getProducts().remove(product);
        userRepository.save(user);
        return product;
    }

    public ProductEntity update(long id, ProductEntity newData) {
        var currData = entityManager.getReference(ProductEntity.class, id);
        modelmapper.map(newData, currData); // new --> updateInto --> current
        return productRepository.save(currData);
    }

    private UserEntity getUserEntityFromContext() {
        return userService.find(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
