package com.example.demo.repositories;

import com.example.demo.entities.SupplierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierEntity, Long>,
        JpaSpecificationExecutor<SupplierEntity> {
}
