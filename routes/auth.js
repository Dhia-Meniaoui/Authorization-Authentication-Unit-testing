const config = require('config');
const jwt = require('jsonwebtoken');
const {User  } = require('../models/user');
const bcrypt = require('bcrypt');
const _=require('lodash');
const express = require('express');
const router = express.Router();




router.post('/', async (req, res)=>{

    
    let user =await User.findOne({email : req.body.email});
    if (!user) return res.status(400).send('you cannot connect.');

    const verif = await bcrypt.compare(req.body.password, user.password  );
    if (!verif) return res.status(400).send('you cannot connect pass.'); 
  
         
    user.generateAuthToken();
    res.send(token);
});   

 

module.exports = router; 