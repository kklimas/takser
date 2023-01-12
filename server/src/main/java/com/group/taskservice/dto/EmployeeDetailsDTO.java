package com.group.taskservice.dto;

import com.group.taskservice.model.Employee;
import com.group.taskservice.model.Task;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDetailsDTO {
    private Employee employee;
    private List<TaskDTO> tasks;
}
