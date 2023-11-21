// const bcrypt = require("bcryptjs");
import bcrypt from "bcryptjs";
import { getUserCreds } from "./database.js";



async function registerUser(email, password) {
    // enctrypt user and register to DB
    let cryptedPass = await bcrypt.hash(password, 15)
    console.log(cryptedPass);
}

async function validateUser(email, password) {
    let dbCreds = await getUserCreds(email);
    // let cryptedPass = await bcrypt.hash(password, 15)
    let comparison = await bcrypt.compare(password, dbCreds.password)

    console.log(comparison);
    console.log('db cred: ', dbCreds);
}


export {registerUser, validateUser};