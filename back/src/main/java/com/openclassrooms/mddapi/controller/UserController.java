package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.response.UserDTO;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtDecoder jwtDecoder;

    @PostMapping("{id}/subscribe/{topicId}")
    public ResponseEntity<String> subscribe(@PathVariable("id") String id, @PathVariable("topicId") String topicId) {
        try {
            userService.subscribe(Long.parseLong(id), Long.parseLong(topicId));

            String response = "User subscribed successfully";
            return ResponseEntity.ok(response);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}/subscribe/{topicId}")
    public ResponseEntity<String> unsubscribe(@PathVariable("id") String id, @PathVariable("topicId") String topicId) {
        try {
            userService.unsubscribe(Long.parseLong(id), Long.parseLong(topicId));

            String response = "User unsubscribed successfully";
            return ResponseEntity.ok(response);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String jwtToken = token.substring(7);

        Jwt decodedJwt = jwtDecoder.decode(jwtToken);
        String emailOrUsername = decodedJwt.getSubject();

        User user = userService.getUserWithEmailOrUsername(emailOrUsername)
            .orElse(null);

        UserDTO userDTO = userService.convertToDTO(user);

        return ResponseEntity.ok(userDTO);
    }

}
