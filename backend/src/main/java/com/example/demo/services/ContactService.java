package com.example.demo.services;

import com.example.demo.models.ContactMail;
import lombok.AllArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
@AllArgsConstructor
public class ContactService {

    private static final String TO_ADDRESS = "vanstreek2@gmail.com";
    private final JavaMailSender javaMailSender;

    public void sendContactEmail(ContactMail contactMail) throws MailException, MessagingException,
            UnsupportedEncodingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setFrom(contactMail.getEmail(), contactMail.getName());
        helper.setTo(TO_ADDRESS);
        helper.setSubject(contactMail.getSubject());
        helper.setText("Bericht van: " + contactMail.getName() + "/" +
                contactMail.getEmail() + "\n\n" + contactMail.getMessage());
        javaMailSender.send(mimeMessage);
    }
}
