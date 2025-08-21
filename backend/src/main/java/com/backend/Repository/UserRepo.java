package com.backend.Repository;

import com.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User , Long> {

    boolean existsByClerkId(String clerkId);

    Optional<User> findByClerkId(String clerkId);
}
