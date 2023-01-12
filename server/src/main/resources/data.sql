insert into employee (id, first_name, last_name, registered_at, last_login)
    values (0, 'Kacper', 'Klimas', '2022-10-10T15:14:14', '2022-10-10T15:14:14');

insert into employee (id, first_name, last_name, registered_at, last_login)
values (1, 'Tomasz', 'Klimas', '2022-10-10T15:14:14', '2022-10-10T15:14:14');

insert into employee (id, first_name, last_name, registered_at, last_login)
values (2, 'Anita', 'Klimas', '2022-10-10T15:14:14', '2022-10-10T15:14:14');

insert into task (id, name, description, created_at, dead_line, employee_id, status)
    values (0, 'task_1', 'simple task for start using spring', '2022-10-10 15:14:14', '2022-10-10 20:14:14', 1, 'SCHEDULED');

insert into task (id, name, description, created_at, dead_line, employee_id, status)
    values (1, 'task_2', 'simple task for start using spring', '2022-10-10 15:14:14', '2022-10-10 20:14:14', 1, 'SCHEDULED');

insert into task (id, name, description, created_at, dead_line, employee_id, status)
    values (2, 'task_3', 'simple task for start using spring', '2022-10-10 15:14:14', '2022-10-10 20:14:14', 1, 'IN_PROGRESS');