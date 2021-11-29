package com.contraly.User.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	    
	@Column(name="name")
	private String name;

	@Column(name="username")
	private String username;
	    
	@Column(name="password")
	private String password;
	    
	@Column(name="email")
	private String email;
	
	@Column(name="verified")
	private Boolean verified;
	
	@Column(name="enabled")
	private Boolean enabled;


}
