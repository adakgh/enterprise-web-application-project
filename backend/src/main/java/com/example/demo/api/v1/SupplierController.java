package com.example.demo.api.v1;

import com.example.demo.models.RoleType;
import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.services.SupplierService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    /**
     * Retrieves supplier-info with the given supplier-id.
     */
    @GetMapping("/{id}")
    public SupplierEntity getSupplierInfo(@PathVariable long id) {
        return supplierService.findById(id);
    }

    /**
     * Retrieves all supplier-info.
     */
    @GetMapping("")
    public List<SupplierEntity> getAllSuppliers() {
        return supplierService.findAll();
    }

    /**
     * Updates the supplier-info of the current logged-in user.
     */
    @Secured(RoleType.SUPPLIER)
    @PutMapping
    public void updateSupplierInfo(@RequestBody SupplierEntity supplier) {
        supplierService.updateById(supplier);
    }
}
