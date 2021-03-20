module.exports = function (req  , res , next) {

    if(!req.user.isAdmin) return res.status(400).send('the currant the user is not an admin');
    next();
   
}