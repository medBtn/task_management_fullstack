package com.teletic.task_management.dto;

import lombok.Data;

@Data
public class TaskRequest {

    private String title;
    private String description;
    private String status;
    private Long assignedTo;
    private Long createdBy;
}
