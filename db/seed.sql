USE employees;

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales', 50000, 1),
    ('Engineer', 75000, 2),
    ('Manager', 100000, 3),
    ('Human Resources', 50000, 4);

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bob', 'Tillmen', 1, null),
    ('Lisa', 'Shultz', 2, 1),
    ('Frank', 'Smith', 3, 1),
    ('Mary', 'Shafer', 4, 1);