package com.backend.Controller;

import com.backend.DTO.UserDto;
import com.backend.Response.RemoveBgResponse;
import com.backend.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<RemoveBgResponse> createOrUpdateUser(@RequestBody UserDto user , Authentication authentication) {
        try {
            System.out.println("JWT Auth name = " + authentication.getName());
            System.out.println("Request clerkId = " + user.getClerkId());

            if (!authentication.getName().equals(user.getClerkId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        RemoveBgResponse.builder()
                                .success(false)
                                .data("User Unauthorized.")
                                .statusCode(HttpStatus.UNAUTHORIZED)
                                .build()
                );
            }

            UserDto newUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    RemoveBgResponse.builder()
                            .success(true)
                            .data(newUser)
                            .statusCode(HttpStatus.CREATED)
                            .build()
            );
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    RemoveBgResponse.builder()
                            .success(false)
                            .data(e.getMessage())
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                            .build()
            );
        }
    }
}
