-- Create a role named 'sianarang'
CREATE ROLE sianarang WITH LOGIN PASSWORD '987651234';

-- Create a database named 'sianarang'
CREATE DATABASE task_management OWNER sianarang;

-- Create a 'users' table with columns for first name, last name, email, and password
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Create a 'projects' table with project details and user_id as a foreign key
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
    project_name VARCHAR(100) NOT NULL,
    project_details TEXT,
    project_status VARCHAR(20) CHECK (project_status IN ('Pending', 'Ongoing', 'Completed')),
    start_date DATE,
    end_date DATE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE  -- Foreign key linked to users table
);

-- Create a 'task' table with task details and user_id as a foreign key
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
    name VARCHAR(100) NOT NULL,
    details TEXT,
    status VARCHAR(20) CHECK (task_status IN ('Pending', 'Ongoing', 'Completed')),
    priority VARCHAR(16) CHECK (task_status IN ('High', 'Mediun', 'Low')),
    start_date DATE,
    end_date DATE,
    project_id INT REFERENCES projects(project_id) ON DELETE CASCADE  -- Foreign key linked to users table
);
