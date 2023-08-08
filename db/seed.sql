-- Table seeing data
USE employees;

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 75000, 1),
    ('Salesperson', 50000, 1),
    ('Lead Engineer', 125000, 2),
    ('Engineer', 100000, 2),
    ('Account Manager', 150000, 3),
    ('Accountant', 115000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 175000, 4);

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bob', 'Tillmen', 1, null),
    ('Lisa', 'Shultz', 2, 1),
    ('Frank', 'Smith', 3, null),
    ('Mary', 'Shafer', 4, 3),
    ('Kevin', 'Allen', 5, null),
    ('John', 'Doe', 6, 5),
    ('Sarah', 'Finch', 7, null),
    ('Ashley', 'Baker', 8, 7);
    