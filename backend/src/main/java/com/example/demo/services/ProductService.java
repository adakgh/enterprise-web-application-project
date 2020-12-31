package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.entities.DiscountPriceEntity;
import com.example.demo.persistence.entities.ImageEntity;
import com.example.demo.persistence.entities.ProductEntity;
import com.example.demo.persistence.entities.UserEntity;
import com.example.demo.persistence.repositories.DiscountPriceRepository;
import com.example.demo.persistence.repositories.ImageRepository;
import com.example.demo.persistence.repositories.ProductCategoryRepository;
import com.example.demo.persistence.repositories.ProductRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.Date;

@Service
@AllArgsConstructor
public class ProductService {

    private final EntityManager entityManager;
    private final ModelMapper modelmapper;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final UserService userService;
    private final ImageRepository imageRepository;
    private final DiscountPriceRepository discountPriceRepository;


    public ProductEntity findById(long id) {
        return productRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Product not found with id: " + id));
    }

    public void deleteById(long id) {
        // TODO: allow only product removals belonging to user.
        productRepository.deleteById(id);
    }

    /**
     * Create and Save the product to the database, we also check for a Product Image if provided
     * And also Product Discounnt if provided
     * @param queryMap The JSON productData received From the Frontend / User
     */
    public ProductEntity save(ObjectNode queryMap) {

        ProductEntity product = new ProductEntity();

        product.setName(queryMap.get("title").asText());
        product.setPrice(queryMap.get("price").decimalValue());
        product.setQuantity(queryMap.get("stock").asDouble());
        product.setUnit(queryMap.get("unit").asText());
        long categoryId = Long.parseLong(queryMap.get("category").asText());
        product.addProductCategory(productCategoryRepository.getOne(categoryId));
        product.setDescription(queryMap.get("description").asText());

        UserEntity user = userService.getCurrentUser();
        product.setSupplier(user.getSupplier());
        product.setAddedDate(new Date());

        System.out.println("The Product for now is: ");
        System.out.println(product);

        /*this.productData.title = this.productForm.value.title;
        this.productData.price = this.productForm.value.price;
        this.productData.stock = this.productForm.value.stock;
        this.productData.unit = this.productForm.value.unit;
        this.productData.category = this.productForm.value.category;
        this.productData.description = this.productForm.value.description;
        this.productData.productDiscounts = this.productDiscounts.value;*/

        // If a image is provided first add and save the image and assign it with the product
        if (queryMap.get("url") != null) {
            // Create the Image
            ImageEntity imageEntity = new ImageEntity(queryMap.get("imageName").asText(), queryMap.get("type").asText(), queryMap.get("url").asText().getBytes());
            // Save the Image in the database
            imageRepository.save(imageEntity);
            // Assign the product with the saved image
            product.setProductImage(imageEntity);
        }

        // If there is any productDiscount added
        if (queryMap.get("productDiscounts").size() >0) {

            // Get the productDiscount Array
            JsonNode productDiscountsproductDiscounts = queryMap.get("productDiscounts");

            // Loop through all discount fields
            for (int i = 0; i < productDiscountsproductDiscounts.size(); i++) {
                // For each Product discount add and save the disountPrice entity
                DiscountPriceEntity discountPriceEntity = new DiscountPriceEntity();
                discountPriceEntity.setDiscountPrice(productDiscountsproductDiscounts.get(i).get("discountPrice").asText());
                discountPriceEntity.setDiscountQuantity(productDiscountsproductDiscounts.get(i).get("discountQuantity").asText());

                // Assign the product with the discount and save discount
                discountPriceEntity.addProduct(product);
                discountPriceRepository.save(discountPriceEntity);

                // Assign the discount with the product
                product.addProductDiscount(discountPriceEntity);
            }
        }

        System.out.println("Product added, The final Product: ");
        System.out.println(product);
        return productRepository.save(product);
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
        updateById(id, updatedProduct, imageEntity);
    }
}
