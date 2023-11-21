// server/index.js
// require('dotenv').config()
// const express = require("express");

import express from "express";
import { registerUser, validateUser } from "./auth.js";



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/login', (req, res) => {
  res.json("Hello there friend");
});

app.post('/login', (req, res) => {
    console.log(req.body);
    // req.body {email:"", password:""}
    // validateUser();
    let email = req.body.email;
    let password = req.body.password;
    validateUser(email, password);

    res.json('Login Successful');
});


app.get('/logout', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});