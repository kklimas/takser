package com.group.taskservice.controller;

import com.group.taskservice.dto.CreateTaskDTO;
import com.group.taskservice.dto.DeleteTasksDTO;
import com.group.taskservice.dto.AssignTasksDTO;
import com.group.taskservice.exception.TaskNotFoundException;
import com.group.taskservice.model.Task;
import com.group.taskservice.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<Task> findAllTasks() {
        return taskService.findAllTasks();
    }

    @GetMapping("{id}")
    public Task findTaskById(@PathVariable Long id) throws TaskNotFoundException {
        return taskService.findTaskById(id);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void createTask(@RequestBody CreateTaskDTO taskDTO) throws TaskNotFoundException {
        taskService.createTask(taskDTO);
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public DeleteTasksDTO deleteTasks(@RequestBody DeleteTasksDTO ids) {
        return taskService.deleteTasks(ids);
    }

    @PostMapping("/assign")
    public List<Task> assignTasks(@RequestBody AssignTasksDTO tasksDTO) {
       return taskService.assignTasks(tasksDTO);
    }

    @PutMapping("/{id}/start")
    public Task markAsStarted(@PathVariable Long id) {
        return taskService.markAsStarted(id);
    }

    @PutMapping("/{id}/finish")
    public Task finishTask(@PathVariable Long id) {
        return taskService.finishTask(id);
    }



}
