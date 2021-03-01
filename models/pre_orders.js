const mongoose = require('mongoose');

const preOrderSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    itemReadyForOrder: Boolean,
});

const preOrderObject = mongoose.model('preorder', preOrderSchema);

module.exports = preOrderObject;