package com.group.taskservice.dto;

import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class CreateTaskDTO {
    private String name;
    private String description;
}
