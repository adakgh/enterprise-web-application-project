package com.example.demo.api.v1;

import com.example.demo.models.RoleType;
import com.example.demo.persistence.SupplierImage;
import com.example.demo.persistence.entities.ImageEntity;
import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.persistence.repositories.ImageRepository;
import com.example.demo.services.SupplierService;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import static com.example.demo.services.SupplierService.compressBytes;
import static com.example.demo.services.SupplierService.decompressBytes;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    @Autowired
    ImageRepository imageRepository;

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
    @PutMapping
    public void updateSupplierInfo(@RequestBody SupplierImage file) throws IOException {
        this.supplierService.updateWithImage(file);
    }




    // TEMP, TEST ENDPOINTS
    /*
    @GetMapping(path = {"/get/{imageId}"})
    public ImageEntity getImage(@PathVariable("imageId") long imageId) throws IOException {
        final Optional<ImageEntity> retrievedImage = imageRepository.findById(imageId);
        //String s = new String(retrievedImage.get().getPicByte(), StandardCharsets.UTF_8);
        // Gson g = new Gson();
        JSONParser jsonParser = new JSONParser(s);
        //System.out.println(s);
        return retrievedImage.get();
    }

    @PutMapping("/upload")
    public ResponseEntity<Void> uploadImage(@RequestBody SupplierImage file) throws IOException {
                System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageEntity img = new ImageEntity(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
//        img.setSupplierEntity(null);
        imageRepository.save(img);
        return ResponseEntity.ok().build();
    }
*/

}
