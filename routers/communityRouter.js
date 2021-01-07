const express = require("express");
const User = require("../models/user");
var router = express.Router();

router.get("/",(req,res)=>{
    var thumb = new Buffer(req.session.user.img.data).toString('base64');
        res.render("adminProfile", {
            user: req.session.user,
            img:thumb
        })

}); 

router.get("/communities",(req,res)=>{
    var thumb = new Buffer(req.session.user.img.data).toString('base64');
    res.render("test",{user: req.session.user,img:thumb})
});

module.exports = router;