package com.openclassrooms.mddapi.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PostRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    @JsonProperty("topic_id")
    private Long topicId;

    @NotBlank
    @JsonProperty("author_id")
    private Long authorId;

}
