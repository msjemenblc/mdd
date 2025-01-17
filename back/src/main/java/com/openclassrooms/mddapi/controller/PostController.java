package com.openclassrooms.mddapi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.request.PostRequest;
import com.openclassrooms.mddapi.dto.response.PostDTO;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private TopicService topicService;

    @GetMapping
    public ResponseEntity<Map<String, List<PostDTO>>> getAllPosts() {
        Map<String, List<PostDTO>> response = new HashMap<>();
        response.put("posts", postService.getAllPosts());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public PostDTO getPost(@PathVariable("id") final Long id) {
        Optional<PostDTO> postDTO = postService.getPost(id);

        if (postDTO.isPresent()) {
            return postDTO.get();
        } else {
            throw new RuntimeException("Post not found with id: " + id);
        }
    }

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody PostRequest postRequest) {
        if (postRequest.getAuthorId() == null || postRequest.getTopicId() == null) {
            throw new IllegalArgumentException("User ID or Topic ID must not be null");
        }

        User author = userService.getUser(postRequest.getAuthorId())
            .orElseThrow(() -> new RuntimeException("User not found with id: " + postRequest.getAuthorId()));

        Topic topic = topicService.getTopicEntity(postRequest.getTopicId())
            .orElseThrow(() -> new RuntimeException("Topic not found with id: " + postRequest.getTopicId()));

        Post newPost = new Post();
        newPost.setTitle(postRequest.getTitle());
        newPost.setDescription(postRequest.getDescription());
        newPost.setAuthor(author);
        newPost.setTopic(topic);

        postService.createPost(newPost);

        String response = "Post created with success";
        return ResponseEntity.ok(response);
    }

}
