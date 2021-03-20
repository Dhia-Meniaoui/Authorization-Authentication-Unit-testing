const jwt= require('jsonwebtoken');
const config = require('config');

module.exports= function (req , res , next ){
    
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).sind('token is not available');
  
    try {
        const decoded = jwt.decode(token, config.get('jwtPrivateKey'));

        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('invalide token');
    }
}