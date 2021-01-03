package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.dto.ProductDto;
import com.example.demo.persistence.entities.ImageEntity;
import com.example.demo.persistence.entities.ProductEntity;
import com.example.demo.persistence.entities.UserEntity;
import com.example.demo.persistence.repositories.ImageRepository;
import com.example.demo.persistence.repositories.ProductCategoryRepository;
import com.example.demo.persistence.repositories.ProductRepository;
import com.example.demo.search.ProductSpecification;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.Map;

@Service
@AllArgsConstructor
public class ProductService {

    private final EntityManager entityManager;
    private final ModelMapper modelmapper;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final UserService userService;
    private final ImageRepository imageRepository;

    public Page<ProductDto> searchAll(Map<String, String> queryMap, Pageable pageable) {
        var productPage = productRepository.findAll(new ProductSpecification(queryMap), pageable);

        return productPage.map((ProductEntity p) -> {
            ProductDto dto = modelmapper.map(p, ProductDto.class);
            dto.setSupplierId(p.getSupplier().getId());
            dto.setSupplierPostalCode(p.getSupplier().getAddresses().iterator().next().getPostalCode());
            return dto;
        });
    }

    public ProductEntity findById(long id) {
        return productRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Product not found with id: " + id));
    }

    public void deleteById(long id) {
        // TODO: allow only product removals belonging to user.
        productRepository.deleteById(id);
    }

    public void save(ProductEntity product, long categoryId, ImageEntity productImage) {
        UserEntity user = userService.getCurrentUser();
        product.setSupplier(user.getSupplier());
        product.setAddedDate(new Date());
        product.addProductCategory(productCategoryRepository.getOne(categoryId));

        if (productImage != null) {
            product.setProductImage(productImage);
        }

        System.out.println("Product added");
        productRepository.save(product);
    }

    public void saveWithImage(ProductEntity product, long categoryId, ImageEntity imageEntity) {
        imageRepository.save(imageEntity);
        save(product, categoryId, imageEntity);
    }

    public void updateById(long id, ProductEntity newProduct, ImageEntity productImage) {
        ProductEntity currentProduct = entityManager.getReference(ProductEntity.class, id);
        modelmapper.map(newProduct, currentProduct); // new --> updateInto --> current

        if (productImage != null) {
            currentProduct.setProductImage(productImage);
        }
        productRepository.save(currentProduct);
    }

    public void updateWithImage(long id, ProductEntity updatedProduct, ImageEntity imageEntity) {
        imageRepository.save(imageEntity);
        updateById(id, updatedProduct,imageEntity);
    }
}
