package com.example.demo.persistence;

import com.example.demo.persistence.entities.SupplierEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
public class SupplierImage {

    private String url;
    private String name;

    /*public SupplierImage() {
    }

    public SupplierImage(SupplierEntity supplier, MultipartFile image) {
        this.supplier = supplier;
        this.image = image;
    }*/

    /*public SupplierEntity getSupplier() {
        return supplier;
    }

    public void setSupplier(SupplierEntity supplier) {
        this.supplier = supplier;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }*/
}
