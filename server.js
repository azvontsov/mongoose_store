// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const productsController = require('./controllers/products');
const productsRouter = require('./controllers/products');



// Initialize app
const app = express()

// Configure settings
require('dotenv').config();






// Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));


// console.log(module)