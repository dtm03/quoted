package org.quoted.backend.database;

import org.quoted.backend.model.Quote;
import org.quoted.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository  extends JpaRepository<Quote, Long> {

    List<Quote> findByUser(User user);
    void deleteByUser(User user);
}
