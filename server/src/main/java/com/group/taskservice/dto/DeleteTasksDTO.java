package com.group.taskservice.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class DeleteTasksDTO {
    private List<Long> ids;
}
