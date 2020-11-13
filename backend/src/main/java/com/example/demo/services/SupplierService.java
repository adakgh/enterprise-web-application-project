package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.persistence.repositories.SupplierRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SupplierService {

    private final SupplierRepository supplierRepository;
    private final ModelMapper modelmapper;

    public SupplierEntity findById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not be found with id: "  + id));
    }

    public void updateById(long id, SupplierEntity newSupplier) {
        SupplierEntity currentSupplier = supplierRepository.getOne(id);
        modelmapper.map(newSupplier, currentSupplier); // new --> updateInto --> current
        supplierRepository.save(currentSupplier);
    }
}
