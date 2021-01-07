const user=require('../models/user')
const path = require('path');

const admin_auth=async (req,res,next)=>{
    if(req.session.user.role=="admin"){
        next();
    }
    else{
        res.status(401).sendFile(path.join(__dirname,'../public/unauthorized.html'))
    }
}
module.exports=admin_auth