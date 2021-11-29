package com.contraly.User.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.contraly.User.dto.UserDto;
import com.contraly.User.model.User;
import com.contraly.User.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
	
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    public List<User> getUsers() {
    	
    	return userRepository.getAllUsers();
    
    }
    
    public UserDto createUser(UserDto user) {
    	user.setPassword(new BCryptPasswordEncoder(10).encode(user.getPassword()));
    	User userToInsert = convertToUser(user);
    	userToInsert.setVerified(false);
    	userToInsert.setEnabled(true);
    	return convertToDto(userRepository.save(userToInsert));
    
    }
    
    public UserDto updateUser(long id, UserDto updateUserDTO) throws Exception {
        User toUpdate = userRepository.findById(id).orElseThrow(Exception::new);
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(updateUserDTO, toUpdate);
        return convertToDto(userRepository.save(toUpdate));
    }
    
    public User convertToUser(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }
    
    private UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
    
    public User saveUser(User user) {
    	return userRepository.save(user);
    }



}
