package com.group.taskservice.dto;

import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
public class AssignTasksDTO {
    Long employeeId;
    List<AssignTaskDTO> tasks;
}
