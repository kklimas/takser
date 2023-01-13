package com.group.taskservice.enums;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TaskStatus {

    CREATED,
    ASSIGNED,
    IN_PROGRESS,
    DONE;
}
