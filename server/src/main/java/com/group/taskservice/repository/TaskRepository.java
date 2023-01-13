package com.group.taskservice.repository;

import com.group.taskservice.model.Employee;
import com.group.taskservice.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findTaskByEmployee(Employee employee);

    @Query("select t from Task t where t.id in :ids")
    List<Task> findTaskByIdIn(List<Long> ids);
}
