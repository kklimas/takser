package com.group.taskservice.dto;

import com.group.taskservice.enums.TaskPriority;
import com.group.taskservice.enums.TaskStatus;
import com.group.taskservice.model.Employee;
import com.group.taskservice.model.Task;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Builder
public class TaskDetailsDTO {
    private Long id;
    private String name;
    private Employee employee;
    private String shortDescription;
    private String description;
    private Task parentId;
    private List<Long> childrenId;
    private Timestamp createdAt;
    private Timestamp deadLine;
    private TaskStatus status;
    private TaskPriority taskPriority;
}
