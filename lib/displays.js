// packages needed
const inquirer = require("inquirer");

// function to display tables based on mysql join statements
function displayAllDepartments(data){
  console.log("\n");
  console.table(data);
}

function displayAllRoles(data){
  console.log("\n");
  console.table(data);
}

function displayAllEmployees(data){
  console.log("\n");
  console.table(data);
}

// export to index js
module.exports = {
  displayAllDepartments,
  displayAllRoles,
  displayAllEmployees
}