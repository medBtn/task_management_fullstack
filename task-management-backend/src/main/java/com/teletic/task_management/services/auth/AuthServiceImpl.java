package com.teletic.task_management.services.auth;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.teletic.task_management.dto.SignUpRequest;
import com.teletic.task_management.dto.UserDto;
import com.teletic.task_management.entity.Task;
import com.teletic.task_management.entity.User;
import com.teletic.task_management.enums.UserRole;
import com.teletic.task_management.repository.TaskRepository;
import com.teletic.task_management.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

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
            userToUpdate.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setUsername(user.getUsername());
            userToUpdate.setRole(user.getRole());

            return userRepository.save(userToUpdate);
        }
        throw new RuntimeException("User not found");
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Page<UserDto> searchUsers(String searchKey, Pageable pageable) {
        Page<User> UserPage = userRepository.searchUsers(searchKey, pageable);
        return UserPage.map(User::toDto);
    }

    public void deleteUserById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }


    // Insert dummy data

    @PostConstruct
    public void postData() {
        if (userRepository.count() == 0) {
            // Create Users
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(bCryptPasswordEncoder.encode("admin"));
            admin.setRole(UserRole.ADMIN);
            userRepository.save(admin);

            User boutine = new User();
            boutine.setUsername("Boutine");
            boutine.setEmail("user1@example.com");
            boutine.setPassword(bCryptPasswordEncoder.encode("admin"));
            boutine.setRole(UserRole.USER);
            userRepository.save(boutine);

            User mohamed = new User();
            mohamed.setUsername("Mohamed");
            mohamed.setEmail("user2@example.com");
            mohamed.setPassword(bCryptPasswordEncoder.encode("admin"));
            mohamed.setRole(UserRole.USER);
            userRepository.save(mohamed);

            User alice = new User();
            alice.setUsername("alice");
            alice.setEmail("alice@example.com");
            alice.setPassword(bCryptPasswordEncoder.encode("admin"));
            alice.setRole(UserRole.USER);
            userRepository.save(alice);

            User bob = new User();
            bob.setUsername("bob");
            bob.setEmail("bob@example.com");
            bob.setPassword(bCryptPasswordEncoder.encode("admin"));
            bob.setRole(UserRole.USER);
            userRepository.save(bob);

            User charlie = new User();
            charlie.setUsername("charlie");
            charlie.setEmail("charlie@example.com");
            charlie.setPassword(bCryptPasswordEncoder.encode("admin"));
            charlie.setRole(UserRole.USER);
            userRepository.save(charlie);

            User diana = new User();
            diana.setUsername("diana");
            diana.setEmail("diana@example.com");
            diana.setPassword(bCryptPasswordEncoder.encode("admin"));
            diana.setRole(UserRole.USER);
            userRepository.save(diana);

            // Create Tasks (only if none exist)
            if (taskRepository.count() == 0) {
                taskRepository.save(makeTask("Complete project", "Finish the task management system", "IN_PROGRESS",
                        boutine, admin));
                taskRepository.save(
                        makeTask("Fix login bug", "Resolve issue with user login credentials", "TODO", mohamed, admin));
                taskRepository.save(
                        makeTask("Design dashboard UI", "Create the layout and color scheme", "DONE", alice, admin));
                taskRepository.save(makeTask("Write unit tests", "Add tests for user and task services", "IN_PROGRESS",
                        boutine, boutine));
                taskRepository.save(
                        makeTask("Deploy to staging", "Push latest build to staging server", "TODO", admin, admin));
                taskRepository.save(
                        makeTask("Set up CI/CD", "Configure Jenkins and GitHub Actions", "IN_PROGRESS", admin, admin));
                taskRepository.save(
                        makeTask("Create API documentation", "Write Swagger/OpenAPI specs", "DONE", bob, admin));
                taskRepository.save(makeTask("Refactor backend code", "Improve code structure and readability",
                        "IN_PROGRESS", mohamed, boutine));
                taskRepository.save(
                        makeTask("Optimize database queries", "Fix N+1 query problem in tasks", "TODO", alice, admin));
                taskRepository.save(makeTask("Research WebSocket support", "Explore real-time updates for tasks",
                        "TODO", boutine, admin));
            }
        }
    }

    private Task makeTask(String title, String description, String status, User assignedTo, User createdBy) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setStatus(status);
        task.setAssignedTo(assignedTo);
        task.setCreatedBy(createdBy);
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return task;
    }
}
