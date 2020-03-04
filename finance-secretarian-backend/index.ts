const express = require("express");
const helmet = require("helmet");
const mysql = require("mysql2/promise");

// const app = express();
// const router = express.router();



testDb();

async function testDb() {
    const dbConnector = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Kurkisnov1!#",
        database: "finance_secretarian"
    });
    const [rows] = await dbConnector.query("select * from test");
    console.log(rows[0].name);
}