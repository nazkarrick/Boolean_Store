//====== SEED DATA =====//
const mongoose = require('mongoose');

const productList = new mongoose.Schema({
    name: String,
    Image: String,
    Description: String,
});

const productList = mongoose.model('productList', productList);

module.exports = productList;