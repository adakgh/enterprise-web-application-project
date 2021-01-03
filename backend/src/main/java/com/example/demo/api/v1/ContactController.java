package com.example.demo.api.v1;

import com.example.demo.models.ContactMail;
import com.example.demo.services.ContactService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class ContactController {

    private final ContactService contactService;

    /**
     * Sends an email to us.
     */
    @PostMapping("/contact")
    public ResponseEntity contactUs(@RequestBody ContactMail contactMail) throws MessagingException,
            UnsupportedEncodingException {

        contactService.sendContactEmail(contactMail);

        return new ResponseEntity(HttpStatus.OK);
    }
}
