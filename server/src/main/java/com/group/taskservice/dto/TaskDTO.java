package com.group.taskservice.dto;

import com.group.taskservice.enums.TaskStatus;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class TaskDTO {
    private Long id;
    private String name;
    private String description;
    private String createdAt;
    private String deadLine;
    private TaskStatus status;
}
