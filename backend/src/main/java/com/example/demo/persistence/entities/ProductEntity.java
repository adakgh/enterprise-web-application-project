package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;

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

    @Column(name = "UNIT")
    private String unit;

    @Column(name = "QUANTITY")
    private Double quantity;

    @Column(name = "PRICE")
    private BigDecimal price;

    @Column(name = "DATE_ADDED")
    private Date addedDate;

    @Transient
    private Map<Object, Object> customData = new HashMap<>();

    @ManyToOne
    @JoinColumn(name = "SUPPLIER_ID")
    @JsonBackReference
    private SupplierEntity supplier;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_CATEGORY_ID")
    private ProductCategoryEntity productCategory;

    @OneToOne(cascade = CascadeType.ALL)
    private ImageEntity productImage;

    @ManyToMany(mappedBy = "product", cascade = CascadeType.MERGE)
    Set<DiscountPriceEntity> discounts = new HashSet<>();

    public void addProductCategory(ProductCategoryEntity productCategory) {
        this.productCategory = productCategory;
        productCategory.getProducts().add(this);
    }

    public void addProductDiscount(DiscountPriceEntity discountPriceEntity) {
        this.discounts.add(discountPriceEntity);
    }

    public void removeDiscount(DiscountPriceEntity discount) {
        this.discounts.remove(discount);
    }

    @Override
    public String toString() {
        return "ProductEntity{" +
                ", id='" + id + '\'' +
                ", name='" + name + '\'' ;
    }
}
