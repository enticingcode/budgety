// server/index.js
import express from "express";
import { registerUser, validateUser } from "./auth.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 3001;
const app = express();
const secretKey = "This is the secret key, please don't tell anyone. Shhhh"

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application x-www-form-urlencoded

function generateToken(user) {
  return jwt.sign({userId: user.id}, secretKey, {expiresIn: "1h"});
}

app.get('/login', (req, res) => {
  res.json("Hello there friend");
});

app.post('/login', async (req, res) => {
    console.log(req.body);
    // req.body {email:"", password:""}
    // validateUser();
    let email = req.body.email;
    let password = req.body.password;
    let user = await validateUser(email, password);
    // need to wait for this to finish.

    console.log('user obj: ', user);

    // if (!user.validPassword) console.log('no') //res.status(401).json({message: "Incorrect username or password"});

    // if (user.validPassword) {
    //   console.log('hi');
    //   // const token = generateToken(user);
    //   // res.json({token});
    // }
});

app.get('/logout', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});