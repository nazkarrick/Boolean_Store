//======== DEPENDENCIES ========//
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//======= CONFIGURATION ======//
const BAZAARONLINE = express();
const PORT = process.env.PORT || 3000; 
const databaseName = 'Boolean';
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

//=========== ROUTES =========//

//Main Page (show)
BAZAARONLINE.get('/Boolean', (req, res) => {
    res.render('main_page.ejs')
})

//Pre Order Page (show)
BAZAARONLINE.get('/Boolean/Pre_Orders', (req, res) => {
    res.render('pre_orders.ejs')
})

//SignIn (show)
BAZAARONLINE.get('/Boolean/signIn', (req, res) => {
    res.render('sign_in.ejs')
})



//==== LOCAL PORT ====//
BAZAARONLINE.listen(PORT, () => {
    console.log(`Private listening @ ${PORT}`)
})