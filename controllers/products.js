// require dependencies
const express = require('express');

// create a route object
const productsRouter = express.Router();
const Product = require('../models/product');




module.export = productsRouter;