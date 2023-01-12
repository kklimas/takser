package com.group.taskservice.enums;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TaskStatus {

    CREATED,
    ASSIGNED,
    SCHEDULED,
    IN_PROGRESS,
    DONE;
}
