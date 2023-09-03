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
      } else if (userResponse.userChoice === "Add Role") {
        addRole();
      } else if (userResponse.userChoice === "View All Departments") {
        viewDeparment();
      } else if (userResponse.userChoice === "Add a Department") {
        addDeparment();
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
      // Parse manager_id as an integer (or leave it as null if empty)
      const managerId = employeeData.manager_id
        ? parseInt(employeeData.manager_id)
        : null;
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
  // Use inquirer to gather updated employee information
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "input",
        message: "Enter the ID of the employee you want to update:",
      },
      {
        name: "new_role_id",
        type: "input",
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then(async (updateData) => {
      // Perform the UPDATE operation to modify the employee's role
      const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
      const values = [updateData.new_role_id, updateData.employee_id];

      try {
        const [result] = await connection.promise().query(sql, values);

        if (result.affectedRows === 0) {
          console.log("Employee not found. No changes made.");
        } else {
          console.log("Employee updated successfully!");
        }
      } catch (error) {
        console.error("Error updating employee:", error);
      }

      // Return to the main menu
      userInput();
    });
}

function viewRoles() {
  console.log("View All Roles");

  // SQL query to select all roles
  const sql = "SELECT * FROM role";

  connection
    .promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
      userInput();
    })
    .catch((error) => {
      console.error("Error fetching roles:", error);
      userInput();
    });
}

function addRole() {
  // Use inquirer to gather role information
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the title of the new role:",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the salary for the new role:",
      },
      {
        name: "department_id",
        type: "input",
        message: "Enter the department ID for the new role:",
      },
    ])
    .then(async (roleData) => {
      // Perform the INSERT operation to add the new role to the database
      const sql =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      const values = [roleData.title, roleData.salary, roleData.department_id];

      try {
        await connection.promise().query(sql, values);
        console.log("Role added successfully!");
      } catch (error) {
        console.error("Error adding role:", error);
      }

      // Return to the main menu
      userInput();
    });
}
function viewDeparment() {
  console.log("view Deparment");

  //SQL Query to Select all Departments
  const sql = "SELECT * FROM department";

  connection
    .promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
      userInput();
    })
    .catch((error) => {
      console.error("Error fetching roles:", error);
    });
}

function addDeparment() {
  // Use inquirer to gather department information
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter the name of the new department:",
      },
    ])
    .then(async (departmentData) => {
      // Perform the INSERT operation to add the new department to the database
      const sql = "INSERT INTO department (name) VALUES (?)";
      const values = [departmentData.name];

      try {
        await connection.promise().query(sql, values);
        console.log("Department added successfully!");
      } catch (error) {
        console.error("Error adding department:", error);
      }

      // Return to the main menu
      userInput();
    });
}
