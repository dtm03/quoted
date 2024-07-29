package org.quoted.backend.controller;

import org.quoted.backend.controller.requests.QuoteBody;
import org.quoted.backend.database.QuoteRepository;
import org.quoted.backend.database.UserRepository;
import org.quoted.backend.model.Quote;
import org.quoted.backend.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@RestController
public class QuoteController {

    private final QuoteRepository quoteRepository;
    private final UserRepository userRepository;

    public QuoteController(QuoteRepository quoteRepository, UserRepository userRepository) {
        this.quoteRepository = quoteRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("quote/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Quote createQuote(@PathVariable("userId") Long userId, @RequestBody QuoteBody quoteBody) {

        // Retrieve user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with userId " + userId + " found"));

        // Create a new Quote object
        Quote quote = new Quote();
        quote.setQuote(quoteBody.getQuote());
        quote.setAuthor(quoteBody.getAuthor());
        quote.setCreationDate(new Date());
        quote.setUser(user);

        // Save the new quote
        return quoteRepository.save(quote);
    }

    @GetMapping("/quote")
    List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    @GetMapping("/quote/{userId}")
    List<Quote> getQuotes(@PathVariable("userId") Long userId) {
        // Retrieve user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with userId " + userId + " found"));

        // Retrieve all quotes created by that User
        return quoteRepository.findByUser(user);
    }

    @PutMapping("quote/{quoteId}")
    public Quote updateQuote(@PathVariable("quoteId") Long quoteId, @RequestBody QuoteBody quoteBody) {
        // Retrieve the existing quote by quoteId
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quote with quoteId " + quoteId + " not found"));

        // Update the existing quote with new values
        quote.setQuote(quoteBody.getQuote());
        quote.setAuthor(quoteBody.getAuthor());

        // Save the updated quote
        return quoteRepository.save(quote);
    }

@DeleteMapping("/quote/{userId}/{quoteId}")
void deleteQuote(@PathVariable("userId") String userIdStr, @PathVariable("quoteId") String quoteIdStr) {
    try {
        Long userId = Long.parseLong(userIdStr);
        Long quoteId = Long.parseLong(quoteIdStr);

        // Retrieve user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with userId " + userId + " not found"));

        // Retrieve quote by quoteId
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quote with quoteId " + quoteId + " not found"));

        // Check if quote belongs to user
        if (!(quote.getUser().getUserId() == userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Quote with quoteId " + quoteId + " not found for user with userId " + userId);
        }

        // Delete the quote
        quoteRepository.delete(quote);
    } catch (NumberFormatException ex) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid userId or quoteId format");
    }
}
}
