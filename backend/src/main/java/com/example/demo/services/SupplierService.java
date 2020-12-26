package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.SupplierImage;
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

import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
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
        return supplierRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Supplier not be found" +
                " with id: " + id));
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
    public boolean updateById(SupplierEntity newSupplier, ImageEntity imageEntity) {
        // var principal = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // long supplierId((Number) principal.getClaims().get("sid")).longValue()

        long supplierId = newSupplier.getId();
        SupplierEntity currentSupplier = supplierRepository.getOne(supplierId); // lazy load

        // update address relationship
        var address = newSupplier.getAddresses().iterator().next();
        address.setSupplier(currentSupplier);

        modelmapper.map(newSupplier, currentSupplier); // new --> updateInto --> current
        if (imageEntity != null) {
            currentSupplier.setProfileImage(imageEntity);
        }
        return supplierRepository.save(currentSupplier) != null ? true : false;
    }

    /**
     * Updates the supplier-info of the current logged-in user. But first we check if we
     * also have send a image. If we also uploaded a image we must first save that then
     * update the supplier
     */
    public boolean updateWithImage(SupplierImage file) throws IOException {

        SupplierEntity newSupplier = file.getSupplier();
        if (file.getName() != null) {

            System.out.println("UPDATING WITH A IMAGE");

            /* TODO delete previous image before saving new one
            // If supplier already has a profileImage uploaded delete that first
            if (newSupplier.getProfileImage() != null){
                Optional<ImageEntity> previousProfileImage = imageRepository.findById(newSupplier.getProfileImage()
                .getId());
                imageRepository.delete(previousProfileImage.get());
            }*/

            // Create ImageEntity and save Image first
            ImageEntity imageEntity = new ImageEntity();
            imageEntity.setName(file.getName());
            imageEntity.setType(file.getType());
            imageEntity.setPicByte(file.getUrl().getBytes());
            imageRepository.save(imageEntity);

            System.out.println(imageEntity);

            // send the saved image with the supplier to be saved
            return updateById(newSupplier, imageEntity);
        } else {
            // Update supplier without image
            System.out.println("DEZE GA IK UPDATEN");
            System.out.println(newSupplier);
            return updateById(newSupplier, null);
        }

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
