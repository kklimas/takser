package com.group.taskservice.repository;

import com.group.taskservice.model.Employee;
import com.group.taskservice.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findTaskByEmployee(Employee employee);
}
