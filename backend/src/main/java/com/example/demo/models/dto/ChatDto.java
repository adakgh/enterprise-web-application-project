package com.example.demo.models.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ChatDto {
    private Long id;
    private String message;
    private Date createdDate;
    private Sender sender;
    private Receiver receiver;

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
