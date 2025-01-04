package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.request.RegisterRequest;
import com.openclassrooms.mddapi.dto.response.UserDTO;
import com.openclassrooms.mddapi.exception.AlreadyExistsException;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO registerUser(RegisterRequest registerRequest) {
        boolean emailExists = userRepository.existsByEmail(registerRequest.getEmail());
        boolean usernameExists = userRepository.existsByUsername(registerRequest.getUsername());

        if (emailExists) {
            throw new AlreadyExistsException("Email already exists: " + registerRequest.getEmail());
        }

        if (usernameExists) {
            throw new AlreadyExistsException("Username already exists:" + registerRequest.getUsername());
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        User savedUser = userRepository.save(user);

        return convertToDTO(savedUser);
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }

}
