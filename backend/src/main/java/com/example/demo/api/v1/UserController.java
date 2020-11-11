package com.example.demo.api.v1;

import com.example.demo.models.RoleType;
import com.example.demo.models.responses.RegistrationResponse;
import com.example.demo.models.responses.UserResponse;
import com.example.demo.persistence.entities.UserEntity;
import com.example.demo.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    /**
     * Registers a new user in the database.
     */
    @PostMapping("/register")
    public RegistrationResponse registerUser(@RequestBody UserEntity user) {
        UserEntity newUser = userService.registerUser(user);
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
}
