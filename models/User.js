const { Schema } = require('mongoose');
const mongoose = require("mongoose");

const UserSchema = new Schema({
    index: String,
    name: String,
    lastName: String,
}, {
    collection: 'users'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;