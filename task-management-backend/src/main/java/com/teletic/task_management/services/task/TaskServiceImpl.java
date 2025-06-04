package com.teletic.task_management.services.task;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.teletic.task_management.dto.TaskDto;
import com.teletic.task_management.dto.TaskRequest;
import com.teletic.task_management.dto.UserDto;
import com.teletic.task_management.entity.Task;
import com.teletic.task_management.entity.User;
import com.teletic.task_management.repository.TaskRepository;
import com.teletic.task_management.repository.UserRepository;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public Task createTask(TaskRequest taskRequest) {

        User assignedTo = userRepository.findById(taskRequest.getAssignedTo()).orElse(null);
        User createdBy = userRepository.findById(taskRequest.getCreatedBy()).orElse(null);

        Task task = new Task();
        task.setTitle(taskRequest.getTitle());
        task.setStatus(taskRequest.getStatus());
        task.setDescription(taskRequest.getDescription());
        task.setAssignedTo(assignedTo);
        task.setCreatedBy(createdBy);

        return taskRepository.save(task);

    }

    public Task updateTask(Task task) {
        Optional<Task> taskOptional = taskRepository.findById(task.getId());
        User assignedTo = userRepository.findById(task.getAssignedTo().getId()).orElse(null);
        User createdBy = userRepository.findById(task.getCreatedBy().getId()).orElse(null);
        if (taskOptional.isPresent()) {
            Task taskToUpdate = taskOptional.get();
            taskToUpdate.setTitle(task.getTitle());
            taskToUpdate.setStatus(task.getStatus());
            taskToUpdate.setDescription(task.getDescription());
            taskToUpdate.setCreatedBy(createdBy);
            taskToUpdate.setAssignedTo(assignedTo);

            return taskRepository.save(taskToUpdate);
        }
        throw new RuntimeException("Task not found");
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Page<TaskDto> searchTasks(String searchKey, Pageable pageable) {
       Page<Task> usersPage = taskRepository.searchTasks(searchKey, pageable);
        return usersPage.map(Task::toDto);
    }
}
