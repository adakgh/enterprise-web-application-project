package com.example.demo.services;

import com.example.demo.persistence.entities.InquiryEntity;
import com.example.demo.persistence.repositories.InquiryCategoryRepository;
import com.example.demo.persistence.repositories.InquiryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InquiryService {

    private final InquiryCategoryRepository inquiryCategoryRepository;
    private final InquiryRepository inquiryRepository;

    public void createInquiry(String message, Long categoryId) {
        var inquiry = new InquiryEntity();
        inquiry.setMessage(message);
        inquiry.addInquiryCategory(inquiryCategoryRepository.getOne(categoryId));
        inquiryRepository.save(inquiry);
    }
}
