package com.group.taskservice.controller;

import com.group.taskservice.dto.CreateTaskDTO;
import com.group.taskservice.dto.DeleteTasksDTO;
import com.group.taskservice.dto.AssignTasksDTO;
import com.group.taskservice.model.Task;
import com.group.taskservice.service.TaskService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/create")
    public Task createTask(@RequestBody CreateTaskDTO taskDTO) {
        return taskService.createTask(taskDTO);
    }

    @DeleteMapping("/delete")
    public DeleteTasksDTO deleteTasks(@RequestBody DeleteTasksDTO ids) {
        return taskService.deleteTasks(ids);
    }

    @PostMapping("/assign")
    public List<Task> assignTasks(@RequestBody AssignTasksDTO tasksDTO) {
        System.out.println(tasksDTO.getTasks());
        System.out.println(tasksDTO.getEmployeeId());
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
