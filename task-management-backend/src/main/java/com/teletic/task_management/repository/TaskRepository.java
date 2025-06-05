package com.teletic.task_management.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.teletic.task_management.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE lower(t.title) LIKE lower(concat('%', :searchTerm, '%')) ")
    Page<Task> searchTasks(@Param("searchTerm") String searchTerm, Pageable pageable); 

    Page<Task> findByAssignedToId(Long userId, Pageable pageable);
}
