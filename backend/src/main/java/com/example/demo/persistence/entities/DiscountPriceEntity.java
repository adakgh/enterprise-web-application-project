package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;

@Getter
@Setter
@Entity(name = "TBL_DISCOUNT_PRICE")
public class DiscountPriceEntity {

    @Id
    @Column(name = "DISCOUNT_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "DISCOUNT_PRICE")
    private BigDecimal discountPrice;

    @Column(name = "DISCOUNT_QUANTITY")
    private String discountQuantity;

    @Transient
    private Map<Object, Object> customData = new HashMap<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "PRODUCT_ID")
    @JsonIgnore
    private ProductEntity product;

    @Override
    public String toString() {
        return "DiscountPriceEntity{" +
                "id=" + id +
                ", discountPrice='" + discountPrice + '\'' +
                ", discountQuantity='" + discountQuantity + '\'' +
                ", customData=" + customData +
                ", product=" + product +
                '}';
    }

}
