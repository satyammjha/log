const mongoose = require('mongoose');

// Define the schema
const LoginSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Create the model and specify the collection name
const LoginModel = mongoose.model('Login', LoginSchema, 'ddosLogin');

module.exports = LoginModel;