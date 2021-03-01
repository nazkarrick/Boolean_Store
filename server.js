//======== DEPENDENCIES ========//
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//======= CONFIGURATION ======//
const BAZAARONLINE = express();
const PORT = process.env.PORT || 3000; 
const databaseName = 'Boolean';
const preOrderObject = require('./models/pre_orders.js')
//mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${databaseName}`
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true})
//======= MIDDLEWARE =========//
BAZAARONLINE.use(express.urlencoded({extended: true}));
BAZAARONLINE.use(methodOverride('_method'));
BAZAARONLINE.use(express.static('public'));


//=========== SEEDS ==========//
BAZAARONLINE.get('/Boolean/seed', (req, res) => {
    preOrderObject.create([
        {
            name: 'Dr34dkn0t',
            image: '/godKingScorpius_EP.png',
            description: 'Stream his debut EP on Spotify',
            itemReadyForOrder: false
        }
    ], (error, data) => {
        res.redirect('/Boolean/Pre_Orders')
    })
})
//=========== ROUTES =========//

//Main Page (Index)
BAZAARONLINE.get('/Boolean', (req, res) => {
    res.render('main_page.ejs')
})

//Pre Order Page
BAZAARONLINE.get('/Boolean/Pre_Orders', (req, res) => {
    preOrderObject.find({}, (error, preOrders) => {
        res.render('pre_orders.ejs', {
            allPreOrders: preOrders
        })
    })
})

//New/Create-Pre-Order
// BAZAARONLINE.post('/Boolean/', (req, res) => {
//     if(req.body.itemReadyForOrder === 'on') {
//         req.body.itemReadyForOrder = true;
//     } else {
//         req.body.itemReadyForOrder = false;
//     }
//     preOrders.create(req.body, (error, newOrders) => {
//         res.redirect('/Boolean/Pre_Orders')
//     })
// })



//SignIn (show)
BAZAARONLINE.get('/Boolean/signIn', (req, res) => {
    res.render('sign_in.ejs')
})



//==== LOCAL PORT ====//
BAZAARONLINE.listen(PORT, () => {
    console.log(`Private listening @ ${PORT}`)
})