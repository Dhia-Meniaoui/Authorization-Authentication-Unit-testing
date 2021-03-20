const config = require('config');
const joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();




mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log('database has been connected'))
    .catch(() => console.log('could not connected to db'));

app.use(express.json());




app.use('/router/Users', require('./routes/Users'));
app.use('/router/auth', require('./routes/auth'));
app.use('/router/gener', require('./routes/geners'));


//login
app.use('/router/login',(req , res) => res.send('login'));
//register
app.use('/router/register',(req , res) => res.send('register'));




if(config.get('jwtPrivateKey')){
    console.log('parivatekey is available');
}



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));