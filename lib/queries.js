// packages needed
const inquirer = require("inquirer");
const connection = require("../config/connection");

// Functions to make lists with mysql join statements
function listAllDepartments(){
  return connection.promise().query("SELECT department.id, department.name FROM department ORDER BY department.id;");
}

function listAllRoles(){
  return connection.promise().query("SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN  department ON role.department_id = department.id ORDER BY role.id;");
}

function listAllEmployees(){
  return connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id ORDER BY employee.id;");
}

// export to index js
module.exports = {
  listAllDepartments,
  listAllRoles,
  listAllEmployees
}