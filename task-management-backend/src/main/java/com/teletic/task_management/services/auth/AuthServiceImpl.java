package com.teletic.task_management.services.auth;

import jakarta.annotation.PostConstruct;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.teletic.task_management.dto.SignUpRequest;
import com.teletic.task_management.dto.UserDto;
import com.teletic.task_management.entity.User;
import com.teletic.task_management.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Boolean userNameExist(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public UserDto createUser(SignUpRequest signUpRequest) {
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getRole());

        return User.toDto(userRepository.save(user));
    }

    public User updateUser(User user) {
        Optional<User> userOptional = userRepository.findById(user.getId());

        if (userOptional.isPresent()) {
            User userToUpdate = userOptional.get();
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setUsername(user.getUsername());
            userToUpdate.setRole(user.getRole());

            return userRepository.save(userToUpdate);
        }
        throw new RuntimeException("User not found");
    }

    /**
     * Get a User by ID
     * 
     * @param id The User ID
     * @return The User with the specified ID, or null if not found
     */
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Page<UserDto> searchUsers(String searchKey, Pageable pageable) {
        Page<User> UserPage = userRepository.searchUsers(searchKey, pageable);
        return UserPage.map(User::toDto);
    }

    // @PostConstruct
    // public void createAdminAccount() {
    //     User adminAccoount = userRepository.findByRole(UserRole.ADMIN);
    //     if (adminAccoount == null) {
    //         User user = new User();
    //         user.setEmail("admin@admin.com");
    //         user.setUsername("admin");
    //         user.setPassword(bCryptPasswordEncoder.encode("admin"));
    //         user.setRole(UserRole.ADMIN);
    //         userRepository.save(user);
    //     }
    // }

}
