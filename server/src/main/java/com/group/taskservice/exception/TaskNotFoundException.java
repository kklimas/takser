package com.group.taskservice.exception;

public class TaskNotFoundException extends Exception{

    public TaskNotFoundException() {
        super("Task was not found.");
    }

    public TaskNotFoundException(Long id) {
        super("Task of id %d was not found.".formatted(id));
    }
}
