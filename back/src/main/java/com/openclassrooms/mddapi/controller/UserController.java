package com.openclassrooms.mddapi.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.request.UpdateUserRequest;
import com.openclassrooms.mddapi.dto.response.UserDTO;
import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.exception.UnauthorizedException;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.JwtService;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    public JwtService jwtService;

    public UserController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/subscribe/{id}")
    public ResponseEntity<String> subscribe(
            @RequestHeader("Authorization") String token, 
            @PathVariable("id") String topicId) {
        try {
            User user = userService.getCurrentUserWithToken(token);
            userService.subscribe(user.getId(), Long.parseLong(topicId));
            
            return ResponseEntity.ok("User subscribed successfully");
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/subscribe/{id}")
    public ResponseEntity<String> unsubscribe(
        @RequestHeader("Authorization") String token, 
        @PathVariable("id") String topicId) {
        try {
            User user = userService.getCurrentUserWithToken(token);
            userService.unsubscribe(user.getId(), Long.parseLong(topicId));

            return ResponseEntity.ok("User unsubscribed successfully");
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            User user = userService.getCurrentUserWithToken(token);
            UserDTO userDTO = userService.convertToDTO(user);

            return ResponseEntity.ok(userDTO);
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/me")
    public ResponseEntity<Map<String, String>> updateCurrentUser(
            @RequestHeader("Authorization") String token,
            @RequestBody UpdateUserRequest updateUserRequest) {

        try {
            User user = userService.getCurrentUserWithToken(token);
            user.setUsername(updateUserRequest.getUsername());
            user.setEmail(updateUserRequest.getEmail());

            userService.save(user);

            String newJwtToken = jwtService.generateToken(user.getUsername());

            Map<String, String> response = new HashMap<>();
            response.put("token", newJwtToken);

            return ResponseEntity.ok(response);
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
