package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.persistence.repositories.SupplierRepository;
import com.example.demo.security.Principal;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SupplierService {

    private final SupplierRepository supplierRepository;
    private final ModelMapper modelmapper;

    /**
     * Retrieves the supplier-info with a given supplier-id. If not found throws a
     * ResourceNotFoundException indicating that the supplier-info could not be found.
     */
    public SupplierEntity findById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not be found with id: "  + id));
    }

    /**
     * Updates the supplier-info of the current logged-in user. This is partially done by
     * retrieving a reference of the supplierEntity through lazy-loading without having to
     * access the actual database and finally mapping the new data into the current data.
     */
    public void updateById(SupplierEntity newSupplier) {
        var principal = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long supplierId = ((Number) principal.getClaims().get("sid")).longValue();
        SupplierEntity currentSupplier = supplierRepository.getOne(supplierId); // lazy load

        // update address relationship
        var address = newSupplier.getAddresses().iterator().next();
        address.setId(currentSupplier.getAddresses().iterator().next().getId());
        address.setSupplier(currentSupplier);

        modelmapper.map(newSupplier, currentSupplier); // new --> updateInto --> current
        supplierRepository.save(currentSupplier);
    }
}
