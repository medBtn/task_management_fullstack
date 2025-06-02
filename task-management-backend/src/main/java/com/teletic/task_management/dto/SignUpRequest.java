package com.teletic.task_management.dto;

import com.teletic.task_management.enums.UserRole;

import lombok.Data;

@Data
public class SignUpRequest {

    private String email;
    private String username;
    private String password;
    private UserRole role;
}
