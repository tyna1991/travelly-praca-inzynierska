const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    login:{
        type:String,
        required: true,
        unique:true,
        minlength: 3
    },
    password:{
        type:String,
        required: true,
        unique:true,
        minlength: 5
    },
    email:{
        type:String,
        required: true,
        unique:true,
        minlength: 5
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User;