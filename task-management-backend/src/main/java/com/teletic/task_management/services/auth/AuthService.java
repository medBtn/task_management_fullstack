package com.teletic.task_management.services.auth;

import com.teletic.task_management.dto.SignUpRequest;
import com.teletic.task_management.dto.UserDto;

public interface AuthService {

    UserDto createUser(SignUpRequest signUpRequest);

    Boolean userNameExist(String email);
}
