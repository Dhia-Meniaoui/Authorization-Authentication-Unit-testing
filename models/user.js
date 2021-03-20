const jwt = require('jsonwebtoken');
const joi= require('joi');
const config = require('config');
const { TokenExpiredError } = require('jsonwebtoken');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        minlength : 5, 
        maxlength : 10        
    },
    email :{
        type : String , 
        required : true ,
        minlength : 5, 
        maxlength : 30,
        unique : true 
    },
    password :{
        type : String , 
        required : true ,
        minlength : 5, 
        maxlength : 1024
    },
    isAdmin: {
        type: Boolean
    }    
});

userSchema.methods.generateAuthToken = function () {
    
    const token = jwt.sign({_id : this.id   , isAdmin : this.isAdmin},'jwtPrivateKey');
    console.log(token);

    return token;
}

const User = mongoose.model('User', userSchema);




exports.User = User ;
