const inquirer = require('inquirer');
const connection = require("./db/connection");

function userInput () { inquirer.prompt([
        {
            name: 'userChoice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add a Department',
                'Exit'
            // message: 'Move up and down arrow to reveal more choices',

            ]
        }
    ]).then(userResponse => {
        if (userResponse.userChoice === 'View All Employees') {
            findAllEmployees()
        }else if (userResponse.userChoice === 'Add Employee') {
            addEmployee()
        }else if (userResponse.userChoice === 'Update Employee Role') {
            updateEmployee()
        }else if (userResponse.userChoice === 'View All Roles' ){
            viewRoles()
        }else if (userResponse.userChoice === 'add Role'){
            addRole()

        }
        else if (userResponse.userChoice === 'Exit'){
            process.exit()
        }
})}
    userInput();
    async function findAllEmployees(){
        console.log("findAllEmployees")
        const sql = "SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.title, department.name from employee left JOIN role on role.id = employee.role_id LEFT JOIN department on department.id = role.department_id;"
         const rows = await connection.promise().query(sql)
         const result = rows[0];
         console.table(result)
        userInput()
    }

    function addEmployee(){
        console.log("addEmployee")
        
        userInput()
    }

    function updateEmployee(){
        console.log("updateEmployee")
        userInput()
    }

    function viewRoles(){
        console.log("viewRoles")
        userInput()
    }

    function addRole(){
        console.log("addRole")
        userInput()
    }