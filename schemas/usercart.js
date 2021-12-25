const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userCart = new Schema({
    username: String,
    password: String,
    items: [{name: String ,image:String , url: String}]

});
module.exports = mongoose.model('users',userCart);