const mysql = require("mysql");
const inquirer = require('inquirer'); // import not working

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'EMPLOYEE_DB'
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId);
    console.log('Welcome to the Employee Database');
    // view all departments,
    // view all roles,
    // view all employees,
    // add a department,
    // add a role,
    // add an employee,
    // update an employee role
    inquirer.prompt({
        /* Pass your questions in here */
        type: 'list',
        name: 'answer',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role'
        ]
    }).then((answer) => {
            // Use user feedback for... whatever!!
        console.log(answer);
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
});