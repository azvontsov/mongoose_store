// require dependecies
const express = require('express');
// create a route object
const productsRouter = express.Router();
const Product = require('../models/product');

// list our router actions

// mount routes

// Index route
productsRouter.get('/', (req, res) => {
  res.send('Hi')
});



// export the model to be accessed in server.js

module.exports = productsRouter;
