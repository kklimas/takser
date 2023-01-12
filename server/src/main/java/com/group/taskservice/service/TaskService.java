package com.group.taskservice.service;

import com.group.taskservice.dto.DeleteTasksDTO;
import com.group.taskservice.dto.TaskDTO;
import com.group.taskservice.enums.TaskStatus;
import com.group.taskservice.dto.CreateTaskDTO;
import com.group.taskservice.dto.AssignTasksDTO;
import com.group.taskservice.model.Employee;
import com.group.taskservice.model.Task;
import com.group.taskservice.repository.EmployeeRepository;
import com.group.taskservice.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(CreateTaskDTO taskDTO) {
        var date = new Date();
        return taskRepository.save(
                Task.builder()
                        .name(taskDTO.getName())
                        .description(taskDTO.getDescription())
                        .status(TaskStatus.CREATED)
                        .createdAt((new Timestamp(date.getTime())).toString())
                        .build()
        );
    }

    public List<Task> assignTasks(AssignTasksDTO taskDTO) {
        var employee = employeeRepository.findById(taskDTO.getEmployeeId()).orElseThrow();
        var tasks = taskDTO.getTasks()
                .stream()
                .map((dto) -> {
                    var task = taskRepository.findById(dto.getTaskId()).orElseThrow();
                    task.setStatus(TaskStatus.ASSIGNED);
                    task.setEmployee(employee);
                    task.setDeadLine(dto.getDeadLine());
                    return task;
                })
                .toList();
        return taskRepository.saveAll(tasks);
    }

    public Task markAsStarted(Long taskId) {
        var task = taskRepository.findById(taskId).orElseThrow();
        task.setStatus(TaskStatus.IN_PROGRESS);

        return taskRepository.save(task);
    }

    public Task finishTask(Long taskId) {
        var task = taskRepository.findById(taskId).orElseThrow();
        task.setStatus(TaskStatus.DONE);

        return taskRepository.save(task);
    }

    public List<TaskDTO> findTasksByEmployee(Employee employee) {
        var tasks = taskRepository.findTaskByEmployee(employee);
        return tasks.stream().map(task -> TaskDTO.builder()
                .id(task.getId())
                .name(task.getName())
                .deadLine(task.getDeadLine())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .description(task.getDescription())
                .build()
        ).toList();
    }

    public DeleteTasksDTO deleteTasks(DeleteTasksDTO ids) {
        var tasksToDelete = ids.getIds().stream().map(id -> taskRepository.findById(id).orElseThrow()).toList();
        taskRepository.deleteAll(tasksToDelete);
        return ids;
    }
}
