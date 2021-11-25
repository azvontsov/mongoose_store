// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const productsController = require('./controllers/products');




// Initialize app
const app = express();

// Configure settings
require('dotenv').config();

const { DATABASE_URL, PORT } = process.env;

// Database Connection
mongoose.connect(DATABASE_URL);
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
});

// mount middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));

// mount routes
app.use('/products', productsController);







// Listener

app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
});


// console.log(module)