/*
REFERENCES:
Websites utilized(CSS styling): cssgradient.io, w3schools.com 
Applications utilized: Inkscape to resize images from clients: Inkscape to create Logo: Keynote for wireframe
Contributors: Ben Manning, Ron Myers, John Jacobs, Glenn Brown, and Phil Winchester
*/
//======== DEPENDENCIES ========//
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//======= CONFIGURATION ======//
const BAZAARONLINE = express();
const PORT = process.env.PORT || 3000; 
const databaseName = 'Boolean';
//======= CONTROLLER LOGIC =====//
const mailingListController = require('./controllers/mailing_list.js')
//======= SCHEMA LOGIC ======//
const preOrderObject = require('./models/pre_orders.js') 
//======== MONGOOSE CONFIGURATION ========//
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${databaseName}`
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true})
//=========== MIDDLEWARE ==========//
BAZAARONLINE.use(express.urlencoded({extended: true}));
BAZAARONLINE.use(methodOverride('_method'));
BAZAARONLINE.use(express.static('public'));
BAZAARONLINE.use(mailingListController)
//======= Pre Order (Seed) ==========//
BAZAARONLINE.get('/Boolean/seed', (req, res) => {
    preOrderObject.create([
        {
            name: 'Dr34dkn0t',
            image: '/godKing400.png',
            description: 'Limited Edition Vinyl Record Coming Soon - Visit Again for Availability! -',
            itemReadyForOrder: false
        }
    ], (error, data) => {
        res.redirect('/Boolean/Pre_Orders')
    })
})
//=========== Main Page (Index) =========//
//Main Page (Index)
BAZAARONLINE.get('/Boolean', (req, res) => {
    res.render('main_page.ejs')
})
//========= Pre Order Page (Index) =============//
BAZAARONLINE.get('/Boolean/Pre_Orders', (req, res) => {
    preOrderObject.find({}, (error, preOrders) => {
        res.render('pre_orders.ejs', {
            allPreOrders: preOrders
        })
    })
})
//========= LOCAL PORT ==============//
BAZAARONLINE.listen(PORT, () => {
    console.log(`Private listening @ ${PORT}`)
})