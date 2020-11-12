package com.example.demo.api.v1;

import com.example.demo.models.InquiryRequest;
import com.example.demo.models.RoleType;
import com.example.demo.persistence.entities.InquiryCategoryEntity;
import com.example.demo.persistence.entities.InquiryEntity;
import com.example.demo.persistence.repositories.InquiryCategoryRepository;
import com.example.demo.persistence.repositories.InquiryRepository;
import com.example.demo.services.InquiryService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/inquiries")
public class InquiryController {

    private final InquiryCategoryRepository inquiryCategoryRepository;
    private final InquiryRepository inquiryRepository;
    private final InquiryService inquiryService;

    /**
     * Retrieves all inquiries.
     */
    @GetMapping
    public List<InquiryEntity> getInquiries() {
        return inquiryRepository.findAll();
    }

    /**
     * Creates and saves a new inquiry to the database.
     */
    @Secured(RoleType.CUSTOMER)
    @PostMapping
    public void CreateInquiry(@RequestBody InquiryRequest request) {
        inquiryService.createInquiry(request.getMessage(), request.getCategoryId());
    }

    /**
     * Retrieves all inquiry categories.
     */
    @GetMapping("/categories")
    public List<InquiryCategoryEntity> getInquiryCategories() {
        return inquiryCategoryRepository.findAll();
    }
}
