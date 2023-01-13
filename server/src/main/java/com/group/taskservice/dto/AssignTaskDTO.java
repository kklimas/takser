package com.group.taskservice.dto;

import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class AssignTaskDTO {
    Long taskId;
    Timestamp deadLine;
}
