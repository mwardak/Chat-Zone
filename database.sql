CREATE DATABASE chat;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(225) NOT NULL,
    lastName VARCHAR(225) NOT NULL,
    email VARCHAR(225) NOT NULL,
    password VARCHAR(225) NOT NULL
    
    );

ALTER TABLE users
ADD COLUMN last_active_at timestamp without time zone;

CREATE TABLE messages(
     messages_id SERIAL PRIMARY KEY,
	 messages_text VARCHAR(225) NOT NULL,
     created_date TIMESTAMP NOT NULL,
     user_id int REFERENCES users(id) NOT NULL
    );
