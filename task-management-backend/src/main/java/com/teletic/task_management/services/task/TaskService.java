package com.teletic.task_management.services.task;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.teletic.task_management.dto.TaskDto;
import com.teletic.task_management.dto.TaskRequest;
import com.teletic.task_management.entity.Task;

public interface TaskService {

    Task createTask(TaskRequest taskRequest);

    Task updateTask(TaskRequest task);

    Page<TaskDto> searchTasks(String searchTerm, Pageable pageable);

    Task getTaskById(Long id);

    void deleteTaskById(Long id);

    Page<TaskDto> getTasksAssignedToUser(Long userId, Pageable pageable);

    Task updateTaskStatus(Long id, String status);

}
