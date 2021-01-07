const express = require("express");
const User = require("../models/user");
var router = express.Router();

router.get("/",(req,res)=>{
    User.findById(req.session.user._id).then((users)=>{
        res.render("adminProfile", {
            user: users
        })

    }).catch(err=>{
        throw err;
    })

}); 

router.get("/communities",(req,res)=>{
    res.render();
});

module.exports = router;