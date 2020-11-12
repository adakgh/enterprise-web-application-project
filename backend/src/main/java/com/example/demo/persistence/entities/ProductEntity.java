package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Entity(name = "TBL_PRODUCT")
public class ProductEntity {

    @Id
    @Column(name = "PRODUCT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "QUANTITY")
    private String quantity;

    @Column(name = "PRICE")
    private BigDecimal price;

    @Column(name = "DISCOUNT_QUANTITY")
    private String quantity2;

    @Column(name = "DISCOUNT_PRICE")
    private BigDecimal price2;

    @Column(name = "DATE_ADDED")
    private Date addedDate;

    @ManyToOne
    @JoinColumn(name = "SUPPLIER_ID")
    @JsonBackReference
    private SupplierEntity supplier;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PRODUCT_CATEGORY_ID")
    private ProductCategoryEntity productCategory;

    public void addProductCategory(ProductCategoryEntity productCategory) {
        this.productCategory = productCategory;
        productCategory.getProducts().add(this);
    }
}
