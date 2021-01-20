CREATE DATABASE chat;

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    messages VARCHAR(225) NOT NULL
    
);

