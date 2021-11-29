package com.contraly.User.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.contraly.User.model.UserVerificationToken;

@Repository
public interface UserVerificationTokenRepository extends JpaRepository<UserVerificationToken, Long> {

    @Query("SELECT t FROM UserVerificationToken t WHERE t.token = ?1")
    UserVerificationToken findVerificationTokenByToken(String token);
}
