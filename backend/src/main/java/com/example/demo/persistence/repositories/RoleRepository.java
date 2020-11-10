package com.example.demo.persistence.repositories;

import com.example.demo.persistence.entities.RoleEntity;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<RoleEntity, Long> {
}
