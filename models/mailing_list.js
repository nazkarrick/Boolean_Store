const mongoose = require('mongoose');

const mailListSchema = new mongoose.Schema({
    email: String,
    confirmation: Boolean,
});

const mailListObject = mongoose.model('booleanMailList', mailListSchema);

module.exports = mailListObject;