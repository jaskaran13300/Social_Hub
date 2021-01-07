const User = require('../models/user');

const auth = async (req, res, next) => {
    if(req.session.loggedIn=="1"){
        next();
    }
    else{
        res.redirect('/')
    }
}
module.exports = auth;