package com.openclassrooms.mddapi.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class AuthRequest {

    @NotBlank
    @Size(min = 5, max = 50)
    private String identifier;

    @NotBlank
    @Size(min = 8, max = 50)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,50}$", 
        message = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.")
    private String password;

}
