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
        name: "Beans",
        description:
          "A small pile of beans. Buy more beans for a big pile of beans.",
        img: "https://imgur.com/LEHS8h3.png",
        price: 5,
        qty: 99,
      },
      {
        name: "Bones",
        description: "It's just a bag of bones.",
        img: "https://imgur.com/dalOqwk.png",
        price: 25,
        qty: 0,
      },
      {
        name: "Bins",
        description: "A stack of colorful bins for your beans and bones.",
        img: "https://imgur.com/ptWDPO1.png",
        price: 7000,
        qty: 1,
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

