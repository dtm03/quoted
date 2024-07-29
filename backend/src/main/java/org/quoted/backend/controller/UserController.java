package org.quoted.backend.controller;

import org.quoted.backend.database.QuoteRepository;
import org.quoted.backend.database.UserRepository;
import org.quoted.backend.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class UserController {
    private final UserRepository userRepository;
    private final QuoteRepository quoteRepository;

    public UserController(UserRepository userRepository, QuoteRepository quoteRepository) {
        this.userRepository = userRepository;
        this.quoteRepository = quoteRepository;
    }

    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<User> createUser() {
        User newUser = userRepository.save(new User());
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @GetMapping("/user")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    User getUser(@PathVariable("userId") Long userId) {
        // Retrieve user by userId
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with userId " + userId + " found"));
    }

    @Transactional
    @DeleteMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteUser(@PathVariable("userId") Long userId) {
        // Retrieve user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with userId " + userId + " not found"));

        // Delete all quotes created by the user and then the user itself
        quoteRepository.deleteByUser(user);
        userRepository.delete(user);
    }
}
