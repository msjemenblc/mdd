package com.openclassrooms.mddapi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.response.TopicDTO;
import com.openclassrooms.mddapi.service.TopicService;

@RestController
@RequestMapping("/api/topic")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public ResponseEntity<Map<String, List<TopicDTO>>> getAllTopics() {
        Map<String, List<TopicDTO>> response = new HashMap<>();
        response.put("topics", topicService.getAllTopics());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public TopicDTO getTopic(@PathVariable("id") final Long id) {
        Optional<TopicDTO> topicDTO = topicService.getTopic(id);
        
        if (topicDTO.isPresent()) {
            return topicDTO.get();
        } else {
            throw new RuntimeException("Topic not found with id " + id);
        }
    }

}
