const express = require('express')

const {getAllUsers} = require('./userlogin/users')
const { registerUser } = require('./userlogin/register')
const { loginUser } = require('./userlogin/login')
const {auth, reqLogger} = require('../config/middleware')
const deleteUser = require('./userlogin/deleteUser')
const welcome = require('./welcome/welcome')
const { getOneUsers } = require('./userlogin/getOneUser')

const app = express()

//Public request server logger
app.use(reqLogger)

//Public Route

app.get('/welcome', (req,res) => welcome(req,res))

app.post('/register', async (req,res) => registerUser(req, res))

app.post('/login', async (req, res) => loginUser(req,res));

// Private request server logger
app.use(auth)

//Private Route

app.get("/users", async (req, res) => getAllUsers(req, res));

app.get("/getOneUser", async (req,res) => getOneUsers(req,res));

app.delete('/deleteUser', async (req,res) => deleteUser(req,res))


module.exports = app;