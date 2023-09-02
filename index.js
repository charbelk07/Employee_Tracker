const inquirer = require("inquirer");
const connection = require("./db/connection");

function userInput() {
  inquirer
    .prompt([
      {
        name: "userChoice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add a Department",
          "Exit",
        ],
      },
    ])
    .then((userResponse) => {
      if (userResponse.userChoice === "View All Employees") {
        findAllEmployees();
      } else if (userResponse.userChoice === "Add Employee") {
        addEmployee();
      } else if (userResponse.userChoice === "Update Employee Role") {
        updateEmployee();
      } else if (userResponse.userChoice === "View All Roles") {
        viewRoles();
      } else if (userResponse.userChoice === "add Role") {
        addRole();
      } else if (userResponse.userChoice === "Exit") {
        process.exit();
      }
    });
}
userInput();
async function findAllEmployees() {
  console.log("findAllEmployees");
  const sql =
    "SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.title, department.name from employee left JOIN role on role.id = employee.role_id LEFT JOIN department on department.id = role.department_id;";
  const rows = await connection.promise().query(sql);
  const result = rows[0];
  console.table(result);
  userInput();
}

function addEmployee() {
  // Use inquirer to gather employee information
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the employee's first name:",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter the employee's last name:",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter the employee's role ID:",
      },
      {
        name: "manager_id",
        type: "input",
        message:
          "Enter the employee's manager ID (if applicable, or leave empty):",
      },
    ])
    .then(async (employeeData) => {
      // Perform the INSERT operation to add the employee to the database
      const sql =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      const values = [
        employeeData.first_name,
        employeeData.last_name,
        employeeData.role_id,
        employeeData.manager_id || null, // Use null if manager_id is not provided
      ];

      try {
        await connection.promise().query(sql, values);
        console.log("Employee added successfully!");
      } catch (error) {
        console.error("Error adding employee:", error);
      }

      // Return to the main menu
      userInput();
    });
}

function updateEmployee() {
  console.log("updateEmployee");
  userInput();
}

function viewRoles() {
  console.log("viewRoles");
  userInput();
}

function addRole() {
  console.log("addRole");
  userInput();
}
