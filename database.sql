CREATE DATABASE chat;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    messages VARCHAR(225) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (email)
    );

