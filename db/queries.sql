-- Queries and join statements for table joins and displaying tables

-- Statement to show departments table
SELECT department.id, department.name FROM department ORDER BY department.id;

-- Statement to join roles table with departments table
SELECT role.id, role.title, role.salary, department.name AS department 
FROM role 
INNER JOIN  department ON role.department_id = department.id 
ORDER BY role.id;

-- Statement to join employee table with other tables
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
CONCAT(m.first_name, '', m.last_name) AS manager
FROM employee 
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee m ON employee.manager_id = m.id
ORDER BY employee.id;

-- Query to insert new department into database
INSERT INTO department (name)
  VALUES ("${newDepartment}");

-- Query to insert new role into database







