const inquirer = require("inquirer");
const connection = require("./config/connection");
const { listAllDepartments } = require("./lib/queries");
const { displayAllDepartments } = require("./lib/displays");
const { listAllRoles } = require("./lib/queries");
const { displayAllRoles } = require("./lib/displays");
const { listAllEmployees } = require("./lib/queries");
const { displayAllEmployees } = require("./lib/displays");
/*
  There are a lot of menu items presented to users in this app. The only real way you cam manage them 
  is by creating a function to handle each one.

  I'm giving you a bit of starter code below.
*/ 


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
              // {
              //   type: 'list',
              //   name: 'new_role_department',
              //   message: 'Which department does the role belong to',
              //   choices: []
              // }
            ])
            .then((answer) => {
              const newRole = (answer['new_role'])
              const newSalary = (answer['new_salary'])
              
              function addNewRole(){
                return connection.promise().query(`INSERT INTO role (title, salary) VALUES ("${newRole}", "${newSalary}");`);
              }
              addNewRole();
              console.log(`Added ${newRole} to the Database`)
            
            start();
            })
  
          break;




      default:
        start();
    }
  })
}


start();