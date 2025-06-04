package com.teletic.task_management.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teletic.task_management.dto.AuthenticationRequest;
import com.teletic.task_management.dto.SignUpRequest;
import com.teletic.task_management.dto.UserDto;
import com.teletic.task_management.entity.User;
import com.teletic.task_management.repository.UserRepository;
import com.teletic.task_management.services.auth.AuthService;
import com.teletic.task_management.utils.JwtUtil;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    private final AuthService authService;

    @PostMapping(path = "/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse response) throws IOException, JSONException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
            System.out.println("Authentication Success");
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        Optional<User> optionalUser = userRepository.findByUsername(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            response.getWriter().write(new JSONObject()
                    .put("userId", optionalUser.get().getId())
                    .put("role", optionalUser.get().getRole())
                    .toString());

            response.addHeader("Access-control-expose-headers", "Authorization");
            response.addHeader("Access-Control-Allow-Headers",
                    "Authorization, X-PINGOTHER , Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
            response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
        }
    }

    @PostMapping(path = "/sign-up")
    public ResponseEntity<?> signUpUser(@RequestBody SignUpRequest signUpRequest) throws IOException, JSONException {
        if (authService.userNameExist(signUpRequest.getUsername())) {
            return new ResponseEntity<>("user already exists !", HttpStatus.NOT_ACCEPTABLE);
        }
        System.out.println("Sign up request: " + signUpRequest);
        UserDto userDto = authService.createUser(signUpRequest);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    /**
     * Get a user by ID
     * 
     * @param id The user ID
     * @return The user with the specified ID
     */
    @GetMapping("user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = authService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "user")
    public ResponseEntity<?> addUser(@RequestBody SignUpRequest signUpRequest) {
        if (authService.userNameExist(signUpRequest.getUsername())) {
            return new ResponseEntity<>("user already exists !", HttpStatus.NOT_ACCEPTABLE);
        }
        System.out.println("Sign up request: " + signUpRequest);
        UserDto userDto = authService.createUser(signUpRequest);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PutMapping(path = "user")
    public ResponseEntity<UserDto> updateUser(@RequestBody User updatedUser) {
        User savedUser = authService.updateUser(updatedUser);
        if (savedUser != null) {
            return ResponseEntity.ok(User.toDto(savedUser));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/users")
    public ResponseEntity<Page<UserDto>> searchUsers(
            @RequestParam(name = "searchTerm", required = false, defaultValue = "") String search,
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<UserDto> users = authService.searchUsers(search, pageable);
        return ResponseEntity.ok(users);
    }

}
