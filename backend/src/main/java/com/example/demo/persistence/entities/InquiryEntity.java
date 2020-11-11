package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity(name = "TBL_INQUIRY")
public class InquiryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "INQUIRY_ID")
    private Long id;

    @Column(name = "MESSAGE")
    private String message;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "INQUIRY_TYPE_ID")
    private InquiryCategoryEntity inquiryCategory;

    public void addInquiryCategory(InquiryCategoryEntity inquiryCategory) {
        this.inquiryCategory = inquiryCategory;
        inquiryCategory.getInquiries().add(this);
    }
}
