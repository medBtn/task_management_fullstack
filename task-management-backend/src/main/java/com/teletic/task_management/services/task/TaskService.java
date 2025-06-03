package com.teletic.task_management.services.task;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.teletic.task_management.dto.TaskRequest;
import com.teletic.task_management.entity.Task;

public interface TaskService {

    Task createTask(TaskRequest taskRequest);

    Task updateTask(Task user);

    Page<Task> searchTasks(String searchTerm, Pageable pageable);

    Task getTaskById(Long id);
}
