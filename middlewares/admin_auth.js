const user=require('../models/user')
const path = require('path');

const admin_auth=async (req,res,next)=>{
    // console.log("admin middlwware calkler")
    // console.log(req.session.user.role);
    if(req.session.user.role=="admin"){
        next();
    }
    else{
        res.status(401).sendFile(path.join(__dirname,'../public/unauthorized.html'))
    }
}
module.exports=admin_auth