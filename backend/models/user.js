const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    function: { type: String },
    phoneNumber: { type: String},
    mobilePhoneNumber: { type: String },
    group: { type: String },
    profileImage: { type: String, required: true }
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);