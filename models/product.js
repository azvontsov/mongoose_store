const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//define the schema
const productSchema = new Schema({
name: String,
dimensions: String,
speed: String,
flight_time: String,
flight_distance: String,
price: Number,
qty: Number,
img: String,
sold: Boolean,
});

// export the model to be accessed in server.js
const Product = mongoose.model('Product', productSchema);
module.exports = Product;