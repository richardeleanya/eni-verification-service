package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> optionalUser = Optional.ofNullable(userService.findByUsername(username));

        return optionalUser
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{username}/risk-score")
    public ResponseEntity<Integer> getRiskScore(@PathVariable String username) {
        Optional<User> optionalUser = Optional.ofNullable(userService.findByUsername(username));

        return optionalUser
                .map(user -> ResponseEntity.ok(user.getRiskScore()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
