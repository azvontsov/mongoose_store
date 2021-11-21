const mongoose = require('mongoose')
const Schema = mongoose.Schema

//define the schema
const productSchema = new Schema({
name: String,
description: String,
img: String,
price: Number,
qty: Number,
});

// export the model to be accessed in server.js
const Product = mongoose.model('product', productSchema);
module.exports = Product;