package com.group.taskservice.dto;

import com.group.taskservice.enums.TaskPriority;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
public class CreateTaskDTO {
    private String name;
    private String shortDescription;
    private Long parentId;
    private String description;
    private List<Long> childrenIds;
    private Timestamp deadLine;
    private TaskPriority taskPriority;
}
