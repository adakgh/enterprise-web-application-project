package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.InquiryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository<InquiryEntity, Long> {
}
