const User = require('../models/user');

const auth = async (req, res, next) => {
    // console.log("auth cakkedd");
    if(req.session.loggedIn=="1"){
        next();
    }
    else{
        res.redirect('/') //get req called
        // res.redirect('index') ->checks for admin/index
        // render checks in views
    }
}
module.exports = auth;