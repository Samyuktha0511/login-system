const express = require('express');
require("./dbconnection/dbconn").connect();
const app = express();
const bodyParser = require('body-parser')

//middlewars
app.use(bodyParser.json());

//routes
const registerRouter = require('./routes/register');
app.use('/register', registerRouter)

const loginRouter = require('./routes/login');
app.use('/login', loginRouter)

const profileRouter = require('./routes/profile');
app.use('/profile', profileRouter)


//listen
app.listen(3000);

module.exports = app;