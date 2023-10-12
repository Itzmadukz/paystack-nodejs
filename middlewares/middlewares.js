const express = require('express');
const path = require('path');
const middleware = express()
const session = require('express-session')

const session_key = process.env.SESSION_KEY

middleware.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 1000 // Set the cookie's maxAge to 1 minute (in milliseconds)
    }
}));

middleware.use(express.static(path.join(__dirname, '../public')))
middleware.use(express.urlencoded({ extended: true }));
middleware.use(express.json());

//EJS setup
middleware.set('view engine', 'ejs')


//Absolute Directory Path
middleware.set('views', path.join(__dirname, '../views'))

module.exports = middleware;