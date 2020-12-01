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
    public void updateSupplierInfo(@RequestBody Map<String, String> queryMap) throws IOException {
        System.out.println(queryMap);
//        System.out.println("JOOO");
//
//        System.out.println(body.getSupplier());
//        System.out.println("JOOO");
//        MultipartFile file = body.getImage();
//        if (file != null) {
//            System.out.println("I CAN ADD IMAGE");
//
//            //            supplierService.updateWithImage(file);
//        } else {
//            // Update only supplier, without saving a image
//
//        }
//        img.setSupplierEntity(null);
//        imageRepository.save(img);
    }


    @GetMapping(path = {"/get/{imageId}"})
    public ImageEntity getImage(@PathVariable("imageId") long imageId) throws IOException {
        final Optional<ImageEntity> retrievedImage = imageRepository.findById(imageId);
        //String s = new String(retrievedImage.get().getPicByte(), StandardCharsets.UTF_8);
        /*// Gson g = new Gson();
        JSONParser jsonParser = new JSONParser(s);*/
        //System.out.println(s);
        return retrievedImage.get();
    }

    @PutMapping("/upload")
    public ResponseEntity<Void> uploadImage(@RequestBody SupplierImage file) throws IOException {
        System.out.println(file);

        ImageEntity imageEntity = new ImageEntity();
        imageEntity.setName(file.getName());
        imageEntity.setPicByte(file.getUrl().getBytes());
        imageRepository.save(imageEntity);
/*        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageEntity img = new ImageEntity(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
//        img.setSupplierEntity(null);
        imageRepository.save(img);*/
        return ResponseEntity.ok().build();
    }

    /*@PostMapping
    public void uploadImage(@RequestParam("file") MultipartFile file) {

        System.out.println(file);
        if (!file.isEmpty()) {
            supplierService.saveImage(file);
        }else{
        }

    }*/

    /*@PostMapping // //new annotation since 4.3
    public String singleFileUpload(@RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "redirect:uploadStatus";
        }

        try {
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get("images/" + file.getOriginalFilename());
            Files.write(path, bytes);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "redirect:/uploadStatus";
    }*/


}
