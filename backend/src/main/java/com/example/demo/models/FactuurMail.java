package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FactuurMail {

    private String receiverEmail;
    private String supplierName;
    private String senderMail;
//    private String message;

    private String productName;
    private String quantity;
    private String unit;
    private String pricePerUnit;
    private String totalPrice;
}
