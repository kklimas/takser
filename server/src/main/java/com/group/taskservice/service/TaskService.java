package com.group.taskservice.service;

import com.group.taskservice.dto.*;
import com.group.taskservice.enums.TaskStatus;
import com.group.taskservice.exception.TaskNotFoundException;
import com.group.taskservice.model.Employee;
import com.group.taskservice.model.Task;
import com.group.taskservice.repository.EmployeeRepository;
import com.group.taskservice.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    public Task findTaskById(Long id) throws TaskNotFoundException {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public void createTask(CreateTaskDTO taskDTO) throws TaskNotFoundException {
        var task = Task.builder()
                .name(taskDTO.getName())
                .shortDescription(taskDTO.getShortDescription())
                .deadLine(taskDTO.getDeadLine())
                .description(taskDTO.getDescription())
                .status(TaskStatus.CREATED)
                .taskPriority(taskDTO.getTaskPriority())
                .build();

        task = taskRepository.save(task);

        // check if task has set parent and if so add itself to parent children
        var parentId = taskDTO.getParentId();
        if (parentId != null) {
            task.setParentId(parentId);
            var parent = taskRepository.findById(parentId)
                    .orElseThrow(() -> new TaskNotFoundException(parentId));
            var parentChildren = parent.getChildrenId();
            parentChildren.add(task.getId());
            taskRepository.save(parent);
        }

        // for each child set its parentId to current task
        setupChildren(task.getId(), taskDTO.getChildrenIds());
        task.setChildrenId(taskDTO.getChildrenIds());

        taskRepository.save(task);
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

    private void setupChildren(Long parentId, List<Long> childrenIds) throws TaskNotFoundException {
        var tasks = taskRepository.findTaskByIdIn(childrenIds);
        if (tasks.size() != childrenIds.size()) {
            throw new TaskNotFoundException();
        }
        tasks.forEach(child -> child.setParentId(parentId));
        taskRepository.saveAll(tasks);
    }
}
