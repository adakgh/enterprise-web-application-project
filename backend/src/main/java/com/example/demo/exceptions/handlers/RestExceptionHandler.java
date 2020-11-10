package com.example.demo.exceptions.handlers;

import com.example.demo.exceptions.ExpiredTokenException;
import com.example.demo.models.responses.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

/**
 * This class makes sure that the correct error response is send back to the client and
 * gives the flexibility to create custom error responses.
 *
 * NOTE: Since Spring boot v.2.3.0 they changed server messages to never be included.
 */
@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(ExpiredTokenException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ExceptionResponse handleExpiredTokenException(HttpServletRequest request) {
        String message = "Token expired, please refresh in order to continue";
        return new ExceptionResponse(HttpStatus.UNAUTHORIZED, message, request.getRequestURI());
    }
}
