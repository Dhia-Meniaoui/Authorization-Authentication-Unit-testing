const config = require('config');
const jwt = require('jsonwebtoken');
const {User  } = require('../models/user');
const bcrypt = require('bcrypt');
const _=require('lodash');
const express = require('express');
const auth = require('./middleware/auth');
const router = express.Router();

router.get('/me',auth, async(req , res )=> {
    const user = await User.findById(req.user._id).select('_password');
    res.send(user);
});
    

router.post('/', async (req, res)=>{
    
    
    let user =await User.findOne({email : req.body.email}); 
    if (user) return res.status(400).send('user is already registered.'); 
    user = new User(_.pick(req.body, ['name','email','password','isAdmin']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt );

    
    await user.save();
    token= user.generateAuthToken();
    console.log(user);
    console.log(token);

    res.header('x-auth-token', token).send(_.pick(user,['id','name','email' ,'isAdmin']));
});      

module.exports.absolute = function(params) {
    if (params > 0) return params;
    if (params < 0) return -params;
    else return 0;
}

module.exports = router; 