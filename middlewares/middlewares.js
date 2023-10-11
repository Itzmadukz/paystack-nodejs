const express = require('express');
const path = require('path');
const middleware = express()

middleware.use(express.static(path.join(__dirname, '../public')))
middleware.use(express.urlencoded({ extended: true }));
middleware.use(express.json());

//EJS setup
middleware.set('view engine', 'ejs')


//Absolute Directory Path
middleware.set('views', path.join(__dirname, '../views'))

module.exports = middleware;