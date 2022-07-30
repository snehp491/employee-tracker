const mysql = require("mysql");

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
});