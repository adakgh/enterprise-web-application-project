package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceAlreadyExistsException extends RuntimeException {

    private final String resourceName;
    private final String resourceValue;

    public ResourceAlreadyExistsException(String resourceName, String resourceValue) {
        super(String.format("An existing resource was found with %s: '%s'", resourceName, resourceValue));
        this.resourceName = resourceName;
        this.resourceValue = resourceValue;
    }
}
