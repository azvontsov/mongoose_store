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
            qty: 2,
            img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6482/6482937cv11d.jpg",
        },
        {
            name: "DJI Air 2S",
            dimensions: "183×253×77 mm",
            speed: "19 m/s",
            flight_time: "31 minutes",
            flight_distance: "18.5 km",
            price: 1000,
            qty: 20,
            img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6454/6454875_sd.jpg",
        },
        {
            name: "DJI Mini 2",
            dimensions: "245×289×56 mm",
            speed: "16 m/s",
            flight_time: "25 minutes",
            flight_distance: "18 km",
            price: 450,
            qty: 15,
            img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6435/6435268cv11d.jpg",
        },
        {
            name: "DJI Mavic Air 2",
            dimensions: "183×253×77 mm",
            speed: "19 m/s",
            flight_time: "34 minutes",
            flight_distance: "18.5 km",
            price: 800,
            qty: 18,
            img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6407/6407742cv11d.jpg",
        },
        {
            name: "Phantom 4 Pro V2.0",
            dimensions: "347.5×283×107.7 mm",
            speed: "10 m/s",
            flight_time: "Approx. 30 minutes",
            flight_distance: "15 km",
            price: 2050,
            qty: 3,
            img: "https://www.adorama.com/images/XLarge/djip4pv2_1.jpg",
        },
        {
            name: "DJI Mini SE",
            dimensions: "159×203×56 mm",
            speed: "13 m/s",
            flight_time: "30 minutes",
            flight_distance: "3 km",
            price: 200,
            qty: 17,
            img: "https://m.media-amazon.com/images/I/51TEcohAqHS._AC_SL1500_.jpg",
        },
        {
            name: "DJI Inspire 2",
            dimensions: "427×317×425 mm",
            speed: "58 mph ",
            flight_time: "27 minutes",
            flight_distance: "18.5 km",
            price: 3300,
            qty: 1,
            img: "https://stormsend1.djicdn.com/tpc/uploads/photos/407/large_820d9638-ecf0-4d80-8a0c-487c12e89c86.jpg",
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
    req.body.sold = !!req.body.sold; 
    Product.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        },
        (err, product) => {
            res.redirect(`/products`)
        });
});



// Create route
productsRouter.post("/", (req, res) => {
    if(req.body.sold === 'on') {
        req.body.sold = true;
    } else {
        req.body.sold = false;
    }
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

// Buy Route
productsRouter.post('/:id/buy', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        if(foundProduct.qty) {
            foundProduct.qty -= 1
            foundProduct.save(() => {
                res.redirect(`/products/${foundProduct._id}`);
            });
        } else {
            res.redirect(`/products/${foundProduct._id}`);
        }
    });
});








module.exports = productsRouter;