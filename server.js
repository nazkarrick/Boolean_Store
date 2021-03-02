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
const mailListObject = require('./models/mailing_list.js') //schema to store information?//
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
            description: 'Pre Orders available Dr34dkn0t\'s God King Scorpius EP',
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

//Mailing List Form (New) 
BAZAARONLINE.get('/Boolean/Mailing', (req, res) => {
    res.render('mailing_list.ejs')
})

//Mailing list (Create)
BAZAARONLINE.post('/Boolean', (req, res) => {
    console.log(req.body)
    if (req.body.confirmation === 'on') {
        req.body.confirmation = true
    } else {
        req.body.confirmation = false
    }
    //Do I push a premade schema? or create an empty seed route where info can be stored?//
    res.redirect('/Boolean')
})

//Pre Order Page
BAZAARONLINE.get('/Boolean/Pre_Orders', (req, res) => {
    preOrderObject.find({}, (error, preOrders) => {
        res.render('pre_orders.ejs', {
            allPreOrders: preOrders
        })
    })
})

//==== LOCAL PORT ====//
BAZAARONLINE.listen(PORT, () => {
    console.log(`Private listening @ ${PORT}`)
})