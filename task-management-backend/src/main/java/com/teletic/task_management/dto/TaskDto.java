package com.teletic.task_management.dto;

import lombok.Data;

@Data
public class TaskDto {

    private Long id;
    private String title;
    private String description;
    private String status;
    private String assignedTo;
    private String createdBy;
}
