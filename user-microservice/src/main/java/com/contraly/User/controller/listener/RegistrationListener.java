package com.contraly.User.controller.listener;

import java.io.IOException;
import java.util.Properties;
import java.util.Scanner;
import java.util.UUID;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.context.ApplicationListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.contraly.User.controller.event.RegistrationEventCompleted;
import com.contraly.User.model.User;
import com.contraly.User.service.UserConfirmationService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class RegistrationListener implements ApplicationListener<RegistrationEventCompleted> {
    private final UserConfirmationService userConfirmationService;

    @Override
    public void onApplicationEvent(RegistrationEventCompleted event) {
        this.confirmRegistration(event);
    }

    public void confirmRegistration(RegistrationEventCompleted event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        userConfirmationService.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String confirmationUrl = "http://localhost:3000/#/verification/token=" + token;

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "email-smtp.us-east-2.amazonaws.com");
        props.put("mail.smtp.port", "25");
        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("AKIAUVKMCVMN7K3ZMAWB", "BIFPUH9586ZT763VZp2WqicL4M4rCgylKgD46O8gM471");
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("aline-financial@mail.com"));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipientAddress));
            message.setSubject("One step away! Confirm your email address");

            StringBuilder htmlBuilder = new StringBuilder();

            Scanner scanner = new Scanner(new ClassPathResource("data/userConfirm.html").getInputStream());
            while(scanner.hasNext()) {
                htmlBuilder.append(scanner.nextLine());
            }
            message.setContent(htmlBuilder.toString().replace("{confirmationUrl}", confirmationUrl), "text/html");
            Transport.send(message);
        } catch (MessagingException | IOException e) {
            System.out.print(e.getMessage());
        }
    }
}
