CREATE DATABASE EMPLOYEE_DB;
USE EMPLOYEE_DB;

CREATE TABLE DEPARTMENT
(
    ID   INT NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(30),
    PRIMARY KEY (ID)
);

CREATE TABLE ROLE
(
    ID INT NOT NULL AUTO_INCREMENT,
    TITLE VARCHAR(45),
    SALARY DECIMAL(7, 2),
    DEPARTMENT_ID INT,
    PRIMARY KEY (ID)
);

CREATE TABLE EMPLOYEE
(
    ID INT NOT NULL AUTO_INCREMENT,
    FIRST_NAME VARCHAR(45),
    LAST_NAME VARCHAR(45),
    ROLE_ID INT,
    MANAGER_ID INT,
    PRIMARY KEY(ID)
);