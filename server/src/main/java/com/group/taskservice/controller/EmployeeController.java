package com.group.taskservice.controller;

import com.group.taskservice.dto.CreateEmployeeDTO;
import com.group.taskservice.dto.EmployeeDetailsDTO;
import com.group.taskservice.service.EmployeeService;
import com.group.taskservice.model.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public List<Employee> findAllEmployees() {
        return employeeService.findAllEmployees();
    }

    @PostMapping("/create")
    public Employee addEmployee(@RequestBody CreateEmployeeDTO employee) {
        return employeeService.createEmployee(employee);
    }

    @GetMapping("/{id}")
    public EmployeeDetailsDTO findEmployeeDetails(@PathVariable Long id) {
        return employeeService.findEmployeeDetails(id);
    }

}
