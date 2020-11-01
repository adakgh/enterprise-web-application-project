package com.example.demo.api.v1;

import com.example.demo.entities.SupplierEntity;
import com.example.demo.repositories.SupplierRepository;
import com.example.demo.search.SupplierSpecification;
import com.example.demo.services.SupplierServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// GET      </users>        --> lists   all users
// POST     </users>        --> creates single user

// GET      </users/{id}>   --> lists   single user
// UPDATE   </users/{id}>   --> updates single user

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class SupplierController {

    private final SupplierServiceImpl supplierService;
    private final SupplierRepository supplierRepository;

    @GetMapping("/suppliers")
    public Page<SupplierEntity> search(@RequestParam(required = false) Map<String, String> queryMap,
                                       @RequestParam(value = "page", required = false) Integer page,
                                       @RequestParam(value = "size", required = false) Integer size,
                                       Pageable pageable) {
        return supplierRepository.findAll(new SupplierSpecification(queryMap), pageable);
    }

    //<editor-fold desc="HttpRequest example">
    /*
     * {
     *     "user": {
     *         "username": "myUsername",
     *         "password": "myPassword",
     *         "roles": ["admin", "user"]
     *     },
     *     "supplier": {
     *         "contactPerson": "firstName lastName"
     *     }
     * }
     */
    //</editor-fold>
    @PostMapping("/suppliers")
    public ResponseEntity<Void> createSupplier(@RequestBody Map<String, Object> payload) {
        supplierService.create(payload);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/suppliers/{id}")
    public SupplierEntity getSupplier(@PathVariable long id) {
        return supplierService.find(id);
    }

    //<editor-fold desc="HttpRequest example">
    /*
     * {
     *     "contactPerson": "Roberto Indemans"
     * }
     */
    //</editor-fold>
    @PutMapping("/suppliers/{id}")
    public SupplierEntity updateSupplier(@PathVariable long id,
                                         @RequestBody SupplierEntity newData) {
        return supplierService.update(id, newData);
    }
}
