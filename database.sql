CREATE DATABASE chat;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(225) NOT NULL,
    lastName VARCHAR(225) NOT NULL,
    email VARCHAR(225) NOT NULL,
    password VARCHAR(225) NOT NULL
    
    );

