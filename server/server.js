import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pool from "./db.js";


const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());


// Extracting the error message when the email already exists while signing up
// example : email@gmail.com already exists

function extractErrorMessage(error) {
    if (error && error.detail) {
      const match = error.detail.match(/\(([^)]+)\) already exists/);
      if (match) {
        return `${match[1]} already exists`;
      }
    }
    return 'An unknown error occurred';
  }


// Get all todos

app.get('/todos/:userEmail', async (req, res) => {
    // console.log(req);
    const userEmail = req.params.userEmail;

    try {
        const client = await pool.connect();
        const todos = 
        await client.query(
            'SELECT * FROM todos WHERE user_email = $1', [userEmail]);

        res.json(todos.rows);

    } catch (err) {
        console.error(err); 
    }
});

// create a new todo

app.post('/todos', async(req, res) => {
    const {user_email, title, progress, date} = req.body;
    console.log(user_email, title, progress, date);
    const id =  uuidv4();

    try {
        const newToDo = 
        await pool.query(
            'INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)',
            [id, user_email, title, progress, date]);

        res.json(newToDo);

    } catch (err) {
        console.error(err); 
    }
})


// edit a new todo

app.put('/todos/:id', async(req, res) => {
    const { id } = req.params;
    const {user_email, title, progress, date} = req.body;

    try {
        const editToDo = 
        await pool.query(
            'UPDATE todos SET user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5;',
            [user_email, title, progress, date, id]);

        res.json(editToDo);

    } catch (err) {
        console.error(err); 
    }
});


// delete a todo item...

app.delete('/todos/:id', async(req,res) => {
    const { id } = req.params;

    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.json(deleteToDo);
    } catch (err) {
        console.error(err);
    }
});


// signup

app.post('/signup', async(req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const signup = await pool.query("INSERT INTO users (email, hashed_password) VALUES($1, $2)",
            [email, hashedPassword]);
        
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        res.json({email, token});

    } catch (err) {
        console.error(err);

        if(err) {
            const errorMessage = extractErrorMessage(err);
            res.json({ detail: errorMessage });
            console.log(errorMessage);
        }
    }
});



// login

app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const users = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

        if(!users.rows.length) return res.json({ detail: "User does not exist!" });

        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        
        if(success) {
            res.json({ 'email' : users.rows[0].email, token});
        
        } else {
            res.json({ detail:  "Login failed" });
        }


    } catch (err) {
        console.error(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
