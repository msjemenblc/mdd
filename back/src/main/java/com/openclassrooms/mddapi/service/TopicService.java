package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.response.TopicDTO;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

import lombok.Data;

@Data
@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    public List<TopicDTO> getAllTopics() {
        List<Topic> topics = topicRepository.findAll();

        return topics.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public Optional<TopicDTO> getTopic(Long id) {
        Optional<Topic> topic = topicRepository.findById(id);

        return topic.map(this::convertToDTO);
    }

    public Optional<Topic> getTopicEntity(Long id) {
        return topicRepository.findById(id);
    }

    public TopicDTO convertToDTO(Topic topic) {
        return new TopicDTO(
            topic.getId(),
            topic.getTitle(),
            topic.getDescription()
        );
    }



}
