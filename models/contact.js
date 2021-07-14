const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const Contact = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    status: { type: Boolean, default: true }
})

// find one user by using username
Contact.statics.findOneByEmail = function(email) {
    console.log(email);
    return this.findOne({
        email
    }).exec()
}

module.exports = mongoose.model('Contact', Contact)