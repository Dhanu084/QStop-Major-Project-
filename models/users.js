const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    designation:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const User = mongoose.model('User',UserSchema);
module.exports = User;