const { string } = require('joi');
const { Schema } = require('mongoose');
const mongoose= require('mongoose');

const generschema= new mongoose.Schema({
    name:{
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50
    }


});


const Gener =mongoose.model('Gener', generschema);


exports.Gener = Gener;