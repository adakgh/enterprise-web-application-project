package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "TBL_PRODUCT_CATEGORY")
public class ProductCategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCT_CATEGORY_ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @JsonBackReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productCategory")
    private Set<ProductEntity> products = new HashSet<>();
}
