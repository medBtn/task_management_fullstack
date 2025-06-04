package com.teletic.task_management.services.auth;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.teletic.task_management.dto.SignUpRequest;
import com.teletic.task_management.dto.UserDto;
import com.teletic.task_management.entity.User;

public interface AuthService {

    UserDto createUser(SignUpRequest signUpRequest);

    User updateUser(User user);

    Page<UserDto> searchUsers(String searchTerm, Pageable pageable);

    Boolean userNameExist(String username);

    void deleteUserById(Long id);

    User getUserById(Long id);
}
