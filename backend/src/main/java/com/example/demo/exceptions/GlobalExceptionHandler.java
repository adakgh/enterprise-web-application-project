package com.example.demo.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@ControllerAdvice
public class GlobalExceptionHandler {

    /*
        Sensitive information is removed from the error response by default,
        unless spring-boot-devtools is implemented, which includes them all.
        In production, we are allowing the exception-message to be transferred
        to the front-end client to be used as an error-message in the UI.

        See: application.properties#server.error.include-message=always
     */

    @ExceptionHandler(GlobalException.class)
    public void handleException(HttpServletResponse res, GlobalException ex) throws IOException {
        res.sendError(ex.getHttpStatus().value(), ex.getMessage());
    }
}
