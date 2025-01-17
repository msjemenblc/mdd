package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.request.CommentRequest;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.CommentService;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<String> createComment(@RequestBody CommentRequest commentRequest) {
        if (commentRequest.getAuthorId() == null || commentRequest.getPostId() == null) {
            throw new IllegalArgumentException("User ID or Post ID must not be null");
        }

        User author = userService.getUser(commentRequest.getAuthorId())
            .orElseThrow(() -> new RuntimeException("User not found with id: " + commentRequest.getAuthorId()));

        Post post = postService.getPostEntity(commentRequest.getPostId())
            .orElseThrow(() -> new RuntimeException("Post not found with id: " + commentRequest.getPostId()));

        Comment newComment = new Comment();
        newComment.setContent(commentRequest.getContent());
        newComment.setPost(post);
        newComment.setAuthor(author);

        commentService.createComment(newComment);

        String response = "Comment created with success";
        return ResponseEntity.ok(response);
    }

}
