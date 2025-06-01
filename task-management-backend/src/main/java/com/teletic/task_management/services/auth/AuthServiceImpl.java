package com.teletic.task_management.services.auth;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.teletic.task_management.dto.SignUpRequest;
import com.teletic.task_management.dto.UserDto;
import com.teletic.task_management.entity.User;
import com.teletic.task_management.enums.UserRole;
import com.teletic.task_management.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserDto createUser(SignUpRequest signUpRequest) {
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getUserRole());

        User createdUser = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        return userDto;
    }

    public Boolean userNameExist(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @PostConstruct
    public void createAdminAccount() {
        User adminAccoount = userRepository.findByRole(UserRole.ADMIN);
        if (adminAccoount == null) {
            User user = new User();
            user.setEmail("admin@admin.com");
            user.setUsername("admin");
            user.setPassword(bCryptPasswordEncoder.encode("admin"));
            user.setRole(UserRole.ADMIN);
            userRepository.save(user);
        }
    }
}
