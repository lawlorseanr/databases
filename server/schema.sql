DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

-- USE chat;
--
-- DROP TABLE IF EXISTS messages;
-- DROP TABLE IF EXISTS users;
--
-- CREATE TABLE users (
--   id INT AUTO_INCREMENT,
--   username VARCHAR(255) NOT NULL,
--   github VARCHAR(255) NOT NULL,
--   /* Automatically generated by sequelize */
--   createdAt DATETIME NOT NULL,
--   updatedAt DATETIME NOT NULL,
--   /* Set primary key and any foreign keys */
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE messages (
--   id INT AUTO_INCREMENT,
--   user_id INT NOT NULL,
--   campus VARCHAR(255) NOT NULL,
--   roomname VARCHAR(255) NOT NULL,
--   content VARCHAR(255) NOT NULL,
--   /* Automatically generated by sequelize */
--   createdAt DATETIME NOT NULL,
--   updatedAt DATETIME NOT NULL,
--   /* Set primary key and any foreign keys */
--   PRIMARY KEY (id),
--   FOREIGN KEY (user_id) REFERENCES users (id)
-- );

-- /*  Execute this file from the command line by typing:
--  *    mysql -u root < server/schema.sql
--  *  to create the database and the tables.*/