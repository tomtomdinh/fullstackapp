/*
  Model class User that is the entire collection of Users in mongodb
  so you are able to access that collection using this model class
*/

const mongoose = require('mongoose');
// const Schema = mongoose.Schema these are the same. destructuring
const { Schema } = mongoose;

/*
  mongoose wants to know ahead of time which properties a record will have
*/

const userSchema = new Schema({
  googleID: String // tells our schema that this value will ALWAYS be a string
});

mongoose.model('users', userSchema);
