package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.ImageEntity;
import com.example.demo.persistence.entities.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
}
