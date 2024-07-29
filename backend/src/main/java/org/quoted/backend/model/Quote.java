package org.quoted.backend.model;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Quote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long quoteId;

    @Column(nullable = false)
    private String quote;

    @Column(nullable = false)
    private String author;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;

    public long getQuoteId() {
        return quoteId;
    }

    public String getQuote() {
        return quote;
    }

    public String getAuthor() {
        return author;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public User getUser() {
        return user;
    }

    public void setQuoteId(long quoteId) {
        this.quoteId = quoteId;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
