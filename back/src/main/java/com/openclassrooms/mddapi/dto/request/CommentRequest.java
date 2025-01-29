package com.openclassrooms.mddapi.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentRequest {

    @NotBlank
    private String content;

    @NotBlank
    @JsonProperty("post_id")
    private Long postId;

}
