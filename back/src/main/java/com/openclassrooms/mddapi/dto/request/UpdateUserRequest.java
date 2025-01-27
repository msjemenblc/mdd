package com.openclassrooms.mddapi.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {

    @NotBlank
    @Size(min = 5, max = 40)
    private String username;

    @NotBlank
    @Email
    @Size(min = 5, max = 50)
    private String email;

}
