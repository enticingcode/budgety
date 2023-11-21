import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
// const mysql = require('mysql2');


async function getUserCreds(email) {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to PlanetScale!');

    let queryString = `SELECT * FROM users WHERE email = '${email}'`
    
    let [rows] = await connection.execute(queryString);

    return rows[0];
    // connection.end();
}



// connection.end();

export {getUserCreds};
  