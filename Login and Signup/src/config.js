const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/login-signup');

//check database connection or not
connect.then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log('Database connection failed', err);
});

//create schema for user
const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

//COLLECITON PART
const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;