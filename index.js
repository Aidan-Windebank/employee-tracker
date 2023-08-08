// Packages to install
const inquirer = require("inquirer");
const connection = require("./config/connection");

// Functions brought in from other js pages
const { listAllDepartments } = require("./lib/queries");
const { displayAllDepartments } = require("./lib/displays");
const { listAllRoles } = require("./lib/queries");
const { displayAllRoles } = require("./lib/displays");
const { listAllEmployees } = require("./lib/queries");
const { displayAllEmployees } = require("./lib/displays");

// Starts whole question process
function start(){
  inquirer.prompt([
    {   
      type: "list",
      message: "Choose an item from the list below:",
      name: "option", 
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role"
      ]
    }
  ]).then( response => {
    switch(response.option){

      case "View All Departments":
        listAllDepartments().then( ([rows]) => {
          displayAllDepartments(rows);
          start();
        });

        break;

      case "View All Roles":
        listAllRoles().then( ([rows]) => {
          displayAllRoles(rows);
          start();
        })

        break;

      case "View All Employees":
        listAllEmployees().then( ([rows]) => {
          displayAllEmployees(rows);
          start();
        })
  
        break;
        
      case "Add a Department":
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'new_department',
              message: 'What is the name of the department'
            }
          ])
          .then((answer) => {
            const newDepartment = (answer['new_department'])
            function addNewDepartment(){
              return connection.promise().query(`INSERT INTO department (name) VALUES ("${newDepartment}");`);
            }
            addNewDepartment();
            console.log(`Added ${newDepartment} to the Database`)
          
          start();
          })

        break;

      case "Add a Role":
        const department = [];
        listAllDepartments().then( ([rows]) => {
          for (let index = 0; index < rows.length; index++) {
            const element = rows[index];
            department.push({name: element.name, value: element.id})
          }
      
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'new_role',
              message: 'What is the name of the role'
            },
            {
              type: 'input',
              name: 'new_salary',
              message: 'What is the salary of the role'
            },
            {
              type: 'list',
              name: 'new_role_department',
              message: 'Which department does the role belong to',
              choices: department
            }
          ])
          .then((answer) => {
            const newRole = answer['new_role']
            const newSalary = parseFloat(answer['new_salary'])
            const newDepartment = answer['new_role_department']
            
            function addNewRole(){
              connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRole}", ${newSalary}, ${newDepartment} );`).then(result => start())
            }
            addNewRole()
            console.log(`Added ${newRole} to the Database`)
          })
        });

        break;

      case "Add an Employee":
        const employee = [];
        listAllEmployees().then( ([rows]) => {
          for (let index = 0; index < rows.length; index++) {
            const element = rows[index];
            employee.push({name: element.first_name + " " + element.last_name, value: element.id})
          }

        const roles = [];
        listAllRoles().then( ([rows]) => {
          for (let index = 0; index < rows.length; index++) {
            const element = rows[index];
            roles.push({name: element.title, value: element.id})
          }
      
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'new_fname',
              message: "What is the employee's first name"
            },
            {
              type: 'input',
              name: 'new_lname',
              message: "What is the employee's last name"
            },
            {
              type: 'list',
              name: 'new_emp_role',
              message: "What is the employee's role",
              choices: roles
            },
            {
              type: 'list',
              name: 'new_emp_manager',
              message: "Who is the employee's manager",
              choices: employee
            }
          ])
          .then((answer) => {
            const newFname = answer['new_fname']
            const newLname = answer['new_lname']
            const newEmpRole = answer['new_emp_role']
            const newEmpManager = answer['new_emp_manager']
            
            function addNewEmployee(){
              connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newFname}", "${newLname}", ${newEmpRole}, ${newEmpManager} );`).then(result => start())
            }
            addNewEmployee()
            console.log(`Added ${newFname} ${newLname} to the Database`)
            })
          })
        });
                
        break;

      case "Update Employee Role":
        const employees = [];
        listAllEmployees().then( ([rows]) => {
          for (let index = 0; index < rows.length; index++) {
            const element = rows[index];
            employees.push({name: element.first_name + " " + element.last_name, value: element.id})
          }

        const roles = [];
        listAllRoles().then( ([rows]) => {
          for (let index = 0; index < rows.length; index++) {
            const element = rows[index];
            roles.push({name: element.title, value: element.id})
          }
      
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'which_employee',
              message: "Which employee's role do you want to update",
              choices: employees
            },
            {
              type: 'list',
              name: 'new_emp_role',
              message: "Which role do you want to assign the selected employee",
              choices: roles
            }
          ])
          .then((answer) => {
            const newEmpRole = answer['new_emp_role']
            const chosenEmployee = answer['which_employee']
            
            function addNewEmployee(){
              connection.promise().query(`UPDATE employee SET role_id = ${newEmpRole} WHERE id = ${chosenEmployee};`).then(result => start())
            }
            addNewEmployee()
            console.log(`Updated Employee's Role`)
          })
        })
      });
        
        break;

      default:
        start();
    }
  })
}

start();