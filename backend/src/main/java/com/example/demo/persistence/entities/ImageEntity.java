package com.example.demo.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Arrays;

@Getter
@Setter
@Entity
public class ImageEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    //image bytes can have large lengths so we specify a value
    //which is more than the default length for picByte column
    @Column(name = "picByte", length = 10000000)
    private byte[] picByte;

    /*private String url;*/

    @JsonIgnore
    @OneToOne(mappedBy = "profileImage")
    private SupplierEntity supplierEntity;


    public ImageEntity() {
        super();
    }

    public ImageEntity(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

    @Override
    public String toString() {
        return "ImageEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", picByte=" + Arrays.toString(picByte) +
                '}';
    }
}
