package org.quoted.backend.database;

import org.quoted.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    void delete(User user);
}