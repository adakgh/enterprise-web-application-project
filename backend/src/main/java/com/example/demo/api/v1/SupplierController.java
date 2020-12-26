package com.example.demo.api.v1;

import com.example.demo.persistence.SupplierImage;
import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.services.SupplierService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
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
     * Updates the supplier-info of the current logged-in user. and return whether update succeeded
     */
    @PutMapping
    public boolean updateSupplierInfo(@RequestBody SupplierImage file) throws IOException {
        return this.supplierService.updateWithImage(file);
    }

}
