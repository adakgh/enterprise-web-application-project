package com.example.demo.persistence;

import com.example.demo.persistence.entities.ProductEntity;
import com.example.demo.persistence.entities.SupplierEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * TussenClass act like a JSON object, to hold different types of values
 */
@Getter
@Setter
@AllArgsConstructor
public class ProductImage {

    private ProductEntity productEntity;
    private String name;
    private String type;
    private String url;

    @Override
    public String toString() {
        return "ProductImage{" +
                "productEntity=" + productEntity +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
