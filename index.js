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
        "Add A Department",
        "Add A Role",
        "Add An Employee",
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
        
      default:
        start();
    }
  })
}


start();