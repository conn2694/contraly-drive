package com.contraly.User.controller.event;

import org.springframework.context.ApplicationEvent;

import com.contraly.User.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationEventCompleted extends ApplicationEvent {


	private User user;
    private String appUrl;

    public RegistrationEventCompleted(User user, String appUrl) {
        super(user);
        this.user = user;
        this.appUrl = appUrl;
    }


}
