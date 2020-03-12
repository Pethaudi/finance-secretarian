DROP TABLE IF EXISTS SALES;
DROP TABLE IF EXISTS CATEGORIES;
DROP TABLE IF EXISTS Users;

CREATE TABLE CATEGORIES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO CATEGORIES (name) VALUES ('Paper');
INSERT INTO CATEGORIES (name) VALUES ('Subscriptions');
INSERT INTO CATEGORIES (name) VALUES ('Brochure');

CREATE TABLE USERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    branch VARCHAR(255)
);

INSERT INTO USERS (email, password, branch) VALUES ('pethaudi@yahoo.de', 'test', 'VB');

CREATE TABLE SALES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    amount FLOAT NOT NULL,
    saledate DATE NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES CATEGORIES(id),
    FOREIGN KEY (userId) REFERENCES USERS(id)
);
INSERT INTO SALES (categoryId, userId, amount, saledate)
    VALUES (1, 1, 5.4, '2020-03-05');