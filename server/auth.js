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
    let isPassValid = await bcrypt.compare(password, dbCreds.password)
    
    dbCreds.validPassword = isPassValid;
    // if(!isPassValid) dbCreds.validPassword = isPassValid;
    // if(isPassValid) dbCreds.validPassword = isPassValid;
    console.log(dbCreds);
    return dbCreds;
}


export {registerUser, validateUser};