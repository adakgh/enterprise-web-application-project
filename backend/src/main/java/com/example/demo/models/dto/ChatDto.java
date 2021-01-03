package com.example.demo.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ChatDto {
    private Long id;
    private String message;
    private Date createdDate;
    private Supplier supplier;
    private Customer customer;
    private Sender sender;
    private Receiver receiver;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Supplier {
        private Long id;
        private String name;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Customer {
        private Long id;
        private String name;
    }

    @Getter
    @Setter
    public static class Sender {
        private Long id;
        private String chatName;
    }

    @Getter
    @Setter
    public static class Receiver {
        private Long id;
        private String chatName;
    }
}
