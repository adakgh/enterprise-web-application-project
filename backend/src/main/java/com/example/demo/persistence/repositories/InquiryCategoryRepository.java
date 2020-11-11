package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.InquiryCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryCategoryRepository extends JpaRepository<InquiryCategoryEntity, Long> {
}
