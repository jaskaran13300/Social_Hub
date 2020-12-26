const user=require('../models/user')

const admin_auth=async (req,res,next)=>{
    console.log("admin middlwware calkler")
    console.log(req.session.user.role);
    if(req.session.user.role=="admin"){
        next();
    }
    else{
        res.redirect('/login')
    }
}
module.exports=admin_auth