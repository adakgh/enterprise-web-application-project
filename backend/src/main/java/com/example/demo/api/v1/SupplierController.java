package com.example.demo.api.v1;

import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.services.SupplierService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping("/{id}")
    public SupplierEntity getSupplierInfo(@PathVariable long id) {
        return supplierService.findById(id);
    }

    @PutMapping("/{id}")
    public SupplierEntity updateSupplierInfo(@PathVariable long id) {
        return supplierService.findById(id);
    }
}
