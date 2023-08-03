const inquirer = require('inquirer');

inquirer
    .createPromptModule([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employe',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add a Department',
            // message: 'Move up and down arrow to reveal more choices',

            ]

        }
    ])