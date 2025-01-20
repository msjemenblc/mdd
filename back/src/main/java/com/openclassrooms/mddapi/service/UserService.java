package com.openclassrooms.mddapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.request.RegisterRequest;
import com.openclassrooms.mddapi.dto.response.TopicDTO;
import com.openclassrooms.mddapi.dto.response.UserDTO;
import com.openclassrooms.mddapi.exception.AlreadyExistsException;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicService topicService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserWithEmailOrUsername(String emailOrUsername) {
        Optional<User> user = userRepository.findByEmail(emailOrUsername);
        
        if (user.isEmpty()) {
            user = userRepository.findByUsername(emailOrUsername);
        }

        return user;
    }

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
        user.setSubscriptions(new ArrayList<Topic>());

        User savedUser = userRepository.save(user);

        return convertToDTO(savedUser);
    }

    public void subscribe(Long id, Long topicId) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        Topic topic = topicService.getTopicEntity(topicId)
            .orElseThrow(() -> new RuntimeException("Topic not found with id: " + topicId));

        boolean alreadySubscribed = user.getSubscriptions().stream().anyMatch(o -> o.getId().equals(topicId));
        if (alreadySubscribed) {
            throw new RuntimeException("User already subscribed to this topic");
        }

        user.getSubscriptions().add(topic);
        userRepository.save(user);
    }

    public void unsubscribe(Long id, Long topicId) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        boolean alreadySubscribed = user.getSubscriptions().stream().anyMatch(o -> o.getId().equals(topicId));
        if (!alreadySubscribed) {
            throw new RuntimeException("User not subscribed to this topic");
        }

        user.setSubscriptions(user.getSubscriptions().stream().filter(topic -> !topic.getId().equals(topicId)).collect(Collectors.toList()));
        userRepository.save(user);
    }

    public UserDTO convertToDTO(User user) {
        List<TopicDTO> topics = user.getSubscriptions().stream()
            .map(topicService::convertToDTO)
            .collect(Collectors.toList());

        return new UserDTO(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            topics,
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }

}
