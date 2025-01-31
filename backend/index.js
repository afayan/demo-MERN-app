import express from "express";
import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mysql from 'mysql2'

const app = express();
const port = 9000;

dotenv.config();

app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  password: process.env.SQL_PASSWORD,
  database: 'user_1',
  host: 'localhost'
})

//connect

//Schema

function authenticate(req, res, next) {
    next()
}

app.post("/api/signup", async (req, res) => {
  const body = req.body;

  if (!body || !body.firstName || !body.email || !body.password) {
    return res.json({ status: "please fill all fields" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(body.password, salt);

  try {

    
    db.query('insert into users(firstname, email, password) values(?, ? , ?);', [body.firstName, body.email, hashedpassword], (err, resultsql)=>{
      if (err) {
        return res.json({ message: "An error occurred" });
      }

      return res.status(201).json({ message: "success" });  
    })


    return res.status(201).json({ message: "success" });


  } catch (error) {
    console.log(error);
    
    return res.json({ message: "email already in use" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const userpassword = password;

  if (!email || !userpassword) {
    return res.json({ message: "Unfilled" });
  }

  return res.json({message: 'No login code implemented yet'})
});

app.listen(port, () => {
  console.log("App is listening on port ", port);
});
