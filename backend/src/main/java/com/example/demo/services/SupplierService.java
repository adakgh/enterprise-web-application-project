package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.entities.ImageEntity;
import com.example.demo.persistence.entities.SupplierEntity;
import com.example.demo.persistence.repositories.ImageRepository;
import com.example.demo.persistence.repositories.SupplierRepository;
import com.example.demo.security.Principal;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
@AllArgsConstructor
public class SupplierService {

    private final SupplierRepository supplierRepository;
    private final ImageRepository imageRepository;
    private final ModelMapper modelmapper;

    /**
     * Retrieves the supplier-info with a given supplier-id. If not found throws a
     * ResourceNotFoundException indicating that the supplier-info could not be found.
     */
    public SupplierEntity findById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not be found with id: " + id));
    }

    /**
     * Retrieves all suppliers-info and returns it.
     */
    public List<SupplierEntity> findAll() {
        return supplierRepository.findAll();
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
        address.setSupplier(currentSupplier);

        modelmapper.map(newSupplier, currentSupplier); // new --> updateInto --> current
        supplierRepository.save(currentSupplier);
    }

    public void updateWithImage(MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageEntity img = new ImageEntity(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));

        System.out.println("SAVEEE MEEE - " + img.getName() );
        imageRepository.save(img);
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

}
