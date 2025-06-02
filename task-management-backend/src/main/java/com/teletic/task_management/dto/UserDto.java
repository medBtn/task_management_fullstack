package com.teletic.task_management.dto;

import com.teletic.task_management.enums.UserRole;

import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String email;
    private String username;
    private UserRole role;
}
