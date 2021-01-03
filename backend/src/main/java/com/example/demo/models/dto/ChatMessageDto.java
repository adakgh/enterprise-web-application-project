package com.example.demo.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDto {

    private boolean isCustomer;
    private String message;
}
