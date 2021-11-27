// require dependecies
const express = require('express')
// create a route object
const productsRouter = express.Router();
const Product = require('../models/product');
// list our router actions


// Mount routes

// Seed route
productsRouter.get('/seed', async (req, res) => {
    const data = [{
        name: "DJI Mavic 3",
        dimensions: "347.5×283×107.7 mm",
        speed: "19 m/s",
        flight_time: "46 minutes",
        flight_distance: "30 km",
        price: 2200,
            qty: 14,
            img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6482/6482937cv11d.jpg",
        },

    ];
    await Product.deleteMany({});
    await Product.create(data);
    res.redirect('/products');
})

// this destroy all products
productsRouter.get('/destroy-data', async (req, res) => {
    await Product.deleteMany({});
    res.redirect('/products');
});

// Index route
productsRouter.get('/', (req, res) => {
    Product.find({}, (err, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

//New route
productsRouter.get("/new", (req, res) => {
    res.render("new.ejs")
});

// Delete route
productsRouter.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
        res.redirect('/products');
    });
});
// Update
productsRouter.put("/:id", (req, res) => {
    
    Product.findByIdAndUpdate(
        req.params.id, 
        req.body, {new: true}, 
        (err, product) => {
        res.redirect(`/products`)
    });
});



// Create route
productsRouter.post("/", (req, res) => {
    
    Product.create(req.body, (err, createdProduct) => {
        res.redirect('/products') // new stuff here
    });
});

// Edit route
productsRouter.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
});


// Show route
productsRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});
// exports the router object so that we require it in server.js


module.exports = productsRouter;

