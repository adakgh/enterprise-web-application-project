package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity(name = "TBL_SUPPLIER_ADDRESS")
public class SupplierAddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "STREET")
    private String street;

    @Column(name = "NUMBER")
    private String number;

    @Column(name = "POSTAL_CODE")
    private String postalCode;

    @Column(name = "CITY")
    private String City;

    @Column(name = "COUNTRY")
    private String Country;

    @ManyToOne
    @JoinColumn(name = "SUPPLIER_ID")
    @JsonBackReference
    private SupplierEntity supplier;
}