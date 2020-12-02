package com.example.demo.api.v1;

import com.example.demo.models.RoleType;
import com.example.demo.models.responses.RegistrationResponse;
import com.example.demo.models.responses.UserResponse;
import com.example.demo.persistence.entities.UserEntity;
import com.example.demo.persistence.repositories.UserRepository;
import com.example.demo.security.jwt.JwtProvider;
import com.example.demo.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    /**
     * Registers a new user in the database and send a verification email.
     */
    @PostMapping("/register")
    public RegistrationResponse registerUser(@RequestBody UserEntity user) throws MessagingException {
        UserEntity newUser = userService.registerUser(user);
        newUser.setLocked(true);
        String jwtToken = jwtProvider.createVerifyingToken(newUser.getUsername());
        userService.sendVerifyingEmail(user, jwtToken);
        return new RegistrationResponse(newUser.getUsername(), "User successfully registered");
    }

    /**
     * Retrieves current context user-info.
     */
    @Secured({RoleType.SUPPLIER, RoleType.CUSTOMER})
    @GetMapping("/me")
    public UserResponse getUserInfo() {
        UserEntity user = userService.getCurrentUser();
        return new UserResponse(user);
    }

    /**
     * Verifies an user by token.
     */
    @GetMapping("/verify")
    public ResponseEntity verifyUser(@RequestParam String token){
        userService.verifyUser(token);
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * Retrieves account locked status by username.
     */
    @GetMapping("/info/{username}")
    public boolean getUserFromUsername(@PathVariable String username) {
        return this.userRepository.findByUsername(username).get().isLocked();
    }

}
