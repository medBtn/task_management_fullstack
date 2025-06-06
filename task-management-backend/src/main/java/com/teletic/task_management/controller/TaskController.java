package com.teletic.task_management.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teletic.task_management.dto.TaskDto;
import com.teletic.task_management.dto.TaskRequest;
import com.teletic.task_management.entity.Task;
import com.teletic.task_management.services.task.TaskService;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class TaskController {

    private final TaskService taskService;

    @GetMapping("task/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task != null) {
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(path = "task")
    public ResponseEntity<Task> addTask(@RequestBody TaskRequest taskRequest) {
        Task savedTask = taskService.createTask(taskRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @PutMapping(path = "task")
    public ResponseEntity<Task> updateTask(@RequestBody TaskRequest updatedTask) {
        Task savedTask = taskService.updateTask(updatedTask);
        if (savedTask != null) {
            return ResponseEntity.ok(savedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping(path = "/task/{id}")
    public ResponseEntity<Task> updateTaskStatus(@RequestBody String status,@PathVariable Long id) {
        Task savedTask = taskService.updateTaskStatus(id, status);
        if (savedTask != null) {
            return ResponseEntity.ok(savedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping(path = "/tasks")
    public ResponseEntity<Page<TaskDto>> searchTasks(
            @RequestParam(name = "searchTerm", required = false, defaultValue = "") String search,
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<TaskDto> tasks = taskService.searchTasks(search, pageable);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping(path = "/assigned/{userId}")
    public ResponseEntity<Page<TaskDto>> getTasksAssignedToUser(
            @PathVariable Long userId,
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getTasksAssignedToUser(userId, pageable);
        return ResponseEntity.ok(tasks);
    }

}
