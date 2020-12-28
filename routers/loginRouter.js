const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const user=require("../models/user")

router.get('/',(req,res)=>{
    req.session.loggedIn=0;
    res.redirect('index.html')
})

router.post('/', (req, res) => {
    console.log(req.body.email);
    user.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            if (user.password == req.body.password) {
                req.session.user = user
                req.session.loggedIn = 1

                res.send(JSON.stringify(user.role));
            } else {
                res.send(JSON.stringify("incorrect"));
            }
        } else {
            res.send(JSON.stringify("not found"));
        }
        console.log(user);
        
    }).catch(err => {
        res.send(JSON.stringify("err"));
    });
});
module.exports=router;