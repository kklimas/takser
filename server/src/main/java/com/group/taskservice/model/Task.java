package com.group.taskservice.model;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.group.taskservice.enums.TaskStatus;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    private String description;
    private String createdAt;
    private String deadLine;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
}
