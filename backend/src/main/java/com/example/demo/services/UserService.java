package com.example.demo.services;

import com.example.demo.exceptions.ResourceAlreadyExistsException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.persistence.entities.UserEntity;
import com.example.demo.persistence.repositories.UserRepository;
import com.example.demo.security.Principal;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final JavaMailSender javaMailSender;
    private static final String EMAIL_SUBJECT = "Activeer je account";
    private static final String FROM_ADDRESS = "info@vanstreek.nl";
    private static final String HOST_ADDRESS = "http://localhost:4200/";

    /**
     * Registers a new user to the database. New users containing an already owned username are
     * ignored and thrown with a ResourceAlreadyExistsException indicating duplication of a given
     * resource (e.g. not unique username).
     */
    public UserEntity registerUser(UserEntity user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new ResourceAlreadyExistsException("Username", user.getUsername());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Retrieves the current context user from the database. Throws a ResourceNotFoundException if
     * the user entity could not be found in the database.
     */
    public UserEntity getCurrentUser() {
        var principal = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByIdWithSupplier(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found in database."));
    }

    /**
     * Sends the email to the user.
     */
    public void sendMail(String user) {
        this.javaMailSender.send(this.createLinkAndMessage(user));
    }

    /**
     * Creates the message and the composition of the verification link.
     */
    private SimpleMailMessage createLinkAndMessage(String user) {
        String url = HOST_ADDRESS + "login";
        String message = "Je kan jouw account activeren doormiddel van de link hieronder.";
        return this.createVerificationMail(message + " \r\n" + url, user);
    }

    /**
     * Creates the email with the correct information.
     */
    private SimpleMailMessage createVerificationMail(String body, String user) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(EMAIL_SUBJECT);
        email.setText(body);
        email.setTo(user);
        email.setFrom(FROM_ADDRESS);

        return email;
    }
}
