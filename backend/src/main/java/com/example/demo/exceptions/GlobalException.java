package com.example.demo.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class GlobalException extends RuntimeException {

    private final String message;
    private final HttpStatus httpStatus;
}
