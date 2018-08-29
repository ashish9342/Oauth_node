const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;


const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail : String
});

//creating model
const User = mongoose.model('user', userSchema)

module.exports = User;
