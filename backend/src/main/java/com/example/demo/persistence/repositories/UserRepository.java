package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    @Query("select u from TBL_USER u left join fetch u.supplier where u.id = :id")
    Optional<UserEntity> findByIdWithSupplier(long id);

    boolean existsByUsername(String username);
}
