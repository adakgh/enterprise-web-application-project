package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "TBL_SUPPLIER")
public class SupplierEntity {

    @Id
    @Column(name = "SUPPLIER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "COMPANY_NAME")
    private String companyName;

    @Column(name = "CONTACT_PERSON")
    private String contactPerson;

    @Column(name = "CONTACT_EMAIL")
    private String contactEmail;

    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

    @Column(name = "WEBSITE")
    private String website;

    @Column(name = "SHORT_DESCRIPTION")
    private String shortDescription;

    @Column(name = "DESCRIPTION")
    private String description;

    @JsonIgnore
    @OneToOne(mappedBy = "supplier")
    private UserEntity user;

    @JsonManagedReference
    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private Set<SupplierAddressEntity> addresses = new HashSet<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
    private Set<ProductEntity> products = new HashSet<>();

    /** JPA convenience method to add a single address */
    public void addAddress(SupplierAddressEntity address) {
        this.addresses.add(address);
        address.setSupplier(this);
    }

    /** JPA convenience method to add a single product */
    public void addProduct(ProductEntity product) {
        this.products.add(product);
        product.setSupplier(this);
    }
}
