package com.contraly.User.service;

import org.springframework.stereotype.Service;

import com.contraly.User.model.User;
import com.contraly.User.model.UserVerificationToken;
import com.contraly.User.repository.UserVerificationTokenRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserConfirmationService {

    private final UserVerificationTokenRepository userVerificationRepository;

    public void createVerificationToken(User user, String token) {
        UserVerificationToken verificationToken = new UserVerificationToken(user, token);
        userVerificationRepository.save(verificationToken);
    }

    public UserVerificationToken getToken(String token) {
        return userVerificationRepository.findVerificationTokenByToken(token);
    }
	
}
