package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.DiscountPriceEntity;
import com.example.demo.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DiscountPriceRepository extends JpaRepository<DiscountPriceEntity, Long> {

}
