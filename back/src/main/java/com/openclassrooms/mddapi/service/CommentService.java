package com.openclassrooms.mddapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.response.AuthorDTO;
import com.openclassrooms.mddapi.dto.response.CommentDTO;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public CommentDTO convertToDTO(Comment comment) {
        AuthorDTO author = new AuthorDTO(
            comment.getAuthor().getId(),
            comment.getAuthor().getUsername()
        );

        return new CommentDTO(
            comment.getId(),
            comment.getContent(),
            author
        );
    }

}
