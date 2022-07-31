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
    start();
});

function start() {
    inquirer.prompt({
        /* Pass your questions in here */
        // view all departments,
        // view all roles,
        // view all employees,
        // add a department,
        // add a role,
        // add an employee,
        // update an employee role
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
    }).then((response) => {
            // Use user feedback for... whatever!!
        const answer = response['answer'];
        console.log(answer);
        console.log(answer === 'View All Departments');
        if (answer === 'View All Departments') {
            getAllDepartments(answer);
        } else if (answer === 'View All Roles') {
            getAllRoles(answer);
        } else if (answer === 'View All Employees') {
            getAllEmployees(answer);
        } else if (answer === 'Add a Department') {
            addDepartment(answer);
        } else if (answer === 'Add a Role') {
            addRole(answer);
        } else if (answer === 'Add an Employee') {
            addEmployee(answer);
        } else if (answer === 'Update an Employee Role') {
            updateEmployeeRole(answer);
        }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

function getAllDepartments(question) {
    const query =
        `SELECT D.ID as 'Department ID', D.NAME as 'Department Name'
        from DEPARTMENT D`;

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log('Completed ' + question);

        start();
    });
}

function getAllRoles(question) {
    const query =
        `SELECT R.TITLE as 'Job Title', R.ID as 'Role ID', D.NAME as 'Department', R.SALARY as 'Salary'
         from ROLE R
                  join DEPARTMENT D on R.ID = D.ID`;

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log('Completed ' + question);

        start();
    });
}

function getAllEmployees(question) {

    const query =
        `SELECT E.ID as 'Employee ID', 
            E.FIRST_NAME as 'First Name', 
            E.LAST_NAME as 'Last Name', 
            R.TITLE as 'Job Title', 
            D.NAME as 'Department', 
            R.SALARY as 'Salary' from EMPLOYEE E
            JOIN ROLE R on E.ROLE_ID = R.ID 
            JOIN DEPARTMENT D on R.DEPARTMENT_ID = D.ID`;
    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log('Completed ' + question);

        start();
    });
}

function addDepartment(question) {
    inquirer
        .prompt(
            {
                type: "input",
                name: "department_name",
                message: "Enter the department name"
            }).then(
        (response) => {
            const department_name = response['department_name'];
            const query =
                `INSERT INTO DEPARTMENT SET ?`;

            connection.query(query, {NAME: department_name},
                function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log('Completed ' + question);

                start();
            });
        }
    );
}

function addRole(question) {

    inquirer
        .prompt([
            {
                type: "input",
                name: "role_name",
                message: "Enter the role name"
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary"
            },
            {
                type: "input",
                name: "department_id",
                message: "Enter the department id",
            }]).then(
        (response) => {
            const role_name = response['role_name'];
            const salary = response['salary'];
            const department_id = response['department_id'];

            const query =
                `INSERT INTO ROLE SET ?`;

            connection.query(query, {TITLE: role_name, SALARY: salary, DEPARTMENT_ID: department_id},
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log('Completed ' + question);

                    start();
                });
        }
    );
}

function addEmployee(question) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter the employee first name"
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter the employee last name"
            },
            {
                type: "input",
                name: "role_id",
                message: "Enter the role id",
            },
            {
                type: "input",
                name: "manager_id",
                message: "Enter the manager id",
            }]).then(
        (response) => {
            const first_name = response['first_name'];
            const last_name = response['last_name'];
            const role_id = response['role_id'];
            const manager_id = response['manager_id'];

            const query =
                `INSERT INTO EMPLOYEE SET ?`;

            connection.query(query, {FIRST_NAME: first_name, LAST_NAME: last_name, ROLE_ID: role_id, MANAGER_ID: manager_id},
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log('Completed ' + question);

                    start();
                });
        }
    );
}

function updateEmployeeRole(question) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "employee_id",
                message: "Enter the employee ID to update the role for"
            },
            {
                type: "input",
                name: "role_id",
                message: "Enter the employees new role"
            }]).then(
        (response) => {
            const employee_id = response['employee_id'];
            const role_id = response['role_id'];

            const query =
                `UPDATE employee SET role_id = ? WHERE id = ?`;

            connection.query(query, [role_id, employee_id],
                function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log('Completed ' + question);

                    start();
                });
        }
    );
}