package com.example.demo.services;

import com.example.demo.entities.SupplierEntity;
import com.example.demo.entities.UserEntity;
import com.example.demo.exceptions.GlobalException;
import com.example.demo.repositories.SupplierRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.Map;

@Service
@AllArgsConstructor
public class SupplierServiceImpl {

    private final UserServiceImpl userService;
    private final SupplierRepository supplierRepository;
    private final EntityManager entityManager;
    private final ModelMapper modelmapper;

    public void create(Map<String, Object> data) {
        var user = modelmapper.map(data.get("user"), UserEntity.class);
        user.setSupplier(modelmapper.map(data.get("supplier"), SupplierEntity.class));
        userService.create(user);
    }

    public SupplierEntity find(long id) {
        return supplierRepository.findById(id).orElseThrow(() ->
                new GlobalException("Supplier not found with id: " + id, HttpStatus.NOT_FOUND));
    }

    public SupplierEntity update(long id, SupplierEntity newData) {
        var currData = entityManager.getReference(SupplierEntity.class, id);
        modelmapper.map(newData, currData); // new --> updateInto --> current
        return supplierRepository.save(currData);
    }
}
