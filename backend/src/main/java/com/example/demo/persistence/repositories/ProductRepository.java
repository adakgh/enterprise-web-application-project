package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository  extends JpaRepository<ProductEntity, Long>,
        JpaSpecificationExecutor<ProductEntity> {
}
