package com.example.demo.models.dto;

import com.example.demo.persistence.entities.DiscountPriceEntity;
import com.example.demo.persistence.entities.ImageEntity;
import com.example.demo.persistence.entities.ProductCategoryEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private String unit;
    private Double quantity;
    private BigDecimal price;
    private String quantity2;
    private BigDecimal price2;
    private Date addedDate;
    private ImageEntity productImage;
    private ProductCategoryEntity productCategory;
    private List<DiscountPriceEntity> discounts;


    private Long supplierId;
    private String supplierPostalCode;
}
