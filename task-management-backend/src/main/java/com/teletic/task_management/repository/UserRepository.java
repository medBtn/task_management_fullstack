package com.teletic.task_management.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.teletic.task_management.entity.User;
import com.teletic.task_management.enums.UserRole;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);

    Optional<User> findByUsername(String username);

    User findByRole(UserRole role);

    @Query("SELECT u FROM User u WHERE " +
            "lower(u.username) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(u.email ) LIKE lower(concat('%', :searchTerm, '%') )")
    Page<User> searchUsers(@Param("searchTerm") String searchTerm, Pageable pageable); // Add this method for findin

}
