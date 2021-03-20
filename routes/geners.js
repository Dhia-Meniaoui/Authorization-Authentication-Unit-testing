const express= require('express');
const Joi = require('joi');
const router = express.Router();
const {Gener} =require('../models/gener');
const auth = require('../routes/middleware/auth');
const admin = require('../routes/middleware/admin');


router.get('/:id' ,async(req, res)=>{
    try {
        const gener= await Gener.find().sort();
        res.send(gener);        
    } catch (error) {
        res.status(500).send('something failed. ');
    }

}); 

router.post('/',auth, async(req,res)=>{
    const {error}= validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let gener = new Gener({name: req.body.name});
    await gener.save();

    res.send(gener);
});

router.delete('/:id',[auth , admin] ,async(req, res)=>{
    const gener =await Gener.findByIdAndRemove(req.params.id);
    if(!gener) return res.status(400).send('the gener with the given id is not identified ');
    res.send(gener);
});

function validate(req) {
    const schema={
        name : Joi.string().max(255)
    }
    return schema;
}


module.exports = router;