/*
Websites utilized: cssgradient.io
Applications utilized: Keynote for background: inkscape for boolean png files:
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
//Schema configuration
const preOrderObject = require('./models/pre_orders.js') 
const mailListObject = require('./models/mailing_list.js')
//Mongoose configuration
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${databaseName}`
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true})
//======= MIDDLEWARE =========//
BAZAARONLINE.use(express.urlencoded({extended: true}));
BAZAARONLINE.use(methodOverride('_method'));
BAZAARONLINE.use(express.static('public'));

//===Seed:1 Pre-Orders , Seed:2 Mailing List===//
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
BAZAARONLINE.get('/Boolean/seed', (req, res) => {
    mailListObject.create([
        {
            email: '',
            confirmation: true
        }
    ], (error, data) => {
        res.redirect('/Boolean')
    })
})
//=========== SHOW ROUTES =========//
//Main Page (Index)
BAZAARONLINE.get('/Boolean', (req, res) => {
    res.render('main_page.ejs')
})
//Pre Order Page (Index)
BAZAARONLINE.get('/Boolean/Pre_Orders', (req, res) => {
    preOrderObject.find({}, (error, preOrders) => {
        res.render('pre_orders.ejs', {
            allPreOrders: preOrders
        })
    })
})
//========Mail List Controller Data==================//
//Mailing List Form (Index) 
BAZAARONLINE.get('/Boolean/Mailing', (req, res) => {
    mailListObject.find({}, (error, mailListNames) => {
        res.render('mailing_list.ejs', {
            allEditEmails: mailListNames
        })
    })
})
//Mailing list (Create)
BAZAARONLINE.post('/Boolean/Mailing', (req, res) => {
    console.log(req.body)
    if (req.body.confirmation === 'on') {
        req.body.confirmation = true
    } else {
        req.body.confirmation = false
    } 
    console.log(req.body)
    mailListObject.create(req.body, (error, mailListNames) => { 
        res.redirect('/Boolean')
    }) 
})
//Mailing List Form (Edit)
BAZAARONLINE.get('/Boolean/Mailing/:eml', (req, res) => {
    mailListObject.findOne(req.params.email, (error, mailListNames) => {
        res.render('mailing_list_edit.ejs', {
            allEditEmails: mailListNames
        })
    })
    console.log(req.body)
})
//Mailing List Form (Update)  
BAZAARONLINE.put('/Boolean/Mailing/:eml', (req, res) => {
    if (req.body.confirmation === 'on') {
        req.body.confirmation = true
    } else {
        req.body.confirmation = false
    } 
    mailListObject.findOneAndUpdate(req.params.email, req.body, {new: true}, (error, updatedMailListName) => {
        res.redirect('/Boolean')
    })
}) 
//Mailing List Form (Show)
BAZAARONLINE.get('/Boolean/Mailing/:eml', (req, res) => {
    mailListObject.findOne(req.params.email, (error, mailListNames) => {
        res.render('mailing_list_show.ejs', {
            allEditEmails: mailListNames[req.params.email]
        })
    })
    console.log(req.body)
})
//Mailing List Form (Delete) 
BAZAARONLINE.delete('/Boolean/Mailing/:eml', (req, res) => {
    mailListObject.findByIdAndDelete(req.params.email, (error, deletedEmailListName) => {
        res.redirect('/Boolean')
    })
    console.log(req.body)
})
//==== LOCAL PORT ====//
BAZAARONLINE.listen(PORT, () => {
    console.log(`Private listening @ ${PORT}`)
})