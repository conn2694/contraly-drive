package com.contraly.User.dto;

import javax.persistence.Id;
import javax.persistence.MapsId;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

	   private Long id;
	   private String name;
	   private String username;
	   private String password;
	   private String email;
	
}
