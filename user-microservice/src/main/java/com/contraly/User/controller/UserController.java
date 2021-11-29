package com.contraly.User.controller;

import java.net.URI;
import java.util.Calendar;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.contraly.User.controller.event.RegistrationEventCompleted;
import com.contraly.User.dto.UserDto;
import com.contraly.User.model.User;
import com.contraly.User.model.UserVerificationToken;
import com.contraly.User.service.UserConfirmationService;
import com.contraly.User.service.UserService;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {
	
    private final @NonNull UserService userService;
    private final UserConfirmationService userConfirmationService;
    private final ApplicationEventPublisher eventPublisher;



    @GetMapping("/")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }
    
    @CrossOrigin
    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto user) {
    	UserDto createdUser = userService.createUser(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("users/{id}")
                .buildAndExpand(createdUser.getId())
                .toUri();
        
        // Create event for activation
        String appUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toString();
        eventPublisher.publishEvent(new RegistrationEventCompleted(userService.convertToUser(createdUser), appUrl));
        
        return ResponseEntity.created(location).contentType(MediaType.APPLICATION_JSON).body(createdUser);

    }
    
    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto user, @PathVariable long id) throws Exception {
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(userService.updateUser(id, user));

    }
    

    
    @CrossOrigin
    @GetMapping("/confirm")
    public ResponseEntity<String> confirmRegistration(@RequestParam("token") String token) {

        UserVerificationToken verificationToken = userConfirmationService.getToken(token);

        if(verificationToken == null) {
            return ResponseEntity.badRequest().body("Token does not exist.");
        }

        User user = verificationToken.getUser();

        user.setVerified(true);
        user.setEnabled(true);

        userService.saveUser(user);

        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("User registration successful!");
    }
    

}
