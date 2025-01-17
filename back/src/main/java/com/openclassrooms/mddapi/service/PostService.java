package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.response.AuthorDTO;
import com.openclassrooms.mddapi.dto.response.CommentDTO;
import com.openclassrooms.mddapi.dto.response.PostDTO;
import com.openclassrooms.mddapi.dto.response.TopicDTO;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;

import lombok.Data;

@Data
@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentService commentService;

    public List<PostDTO> getAllPosts() {
        List<Post> posts = postRepository.findAll();

        return posts.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public Optional<PostDTO> getPost(Long id) {
        Optional<Post> post = postRepository.findById(id);

        return post.map(this::convertToDTO);
    }

    public Optional<Post> getPostEntity(Long id) {
        return postRepository.findById(id);
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public PostDTO convertToDTO(Post post) {
        TopicDTO topic = new TopicDTO(
            post.getTopic().getId(),
            post.getTopic().getTitle(),
            post.getTopic().getDescription()
        );

        AuthorDTO author = new AuthorDTO(
            post.getAuthor().getId(),
            post.getAuthor().getUsername()
        );

        List<CommentDTO> comments = post.getComments().stream()
            .map(commentService::convertToDTO)
            .collect(Collectors.toList());

        return new PostDTO(
            post.getId(),
            post.getTitle(),
            post.getDescription(),
            topic,
            author,
            comments,
            post.getCreatedAt(),
            post.getUpdatedAt()
        );
    }

}
