const express = require("express");
const User = require("../models/user");
var router = express.Router();
// var bodyparser = require('body-parser')
// var app=express()
// app.use(bodyparser.urlencoded({ extended: false }))

router.get("/",async (req,res)=>{
    var thumb = new Buffer.from(req.session.user.img.data).toString('base64');
        res.render("adminProfile", {
            user: req.session.user,
            img:thumb
        })

}); 

router.get("/communities",async (req,res)=>{
    var thumb = new Buffer.from(req.session.user.img.data).toString('base64');
    res.render("communityPanel",{user: req.session.user,img:thumb})
});

router.get("/AddCommunity",(req,res)=>{
    var thumb = new Buffer.from(req.session.user.img.data).toString('base64');
    res.render("AddCommunity",{user: req.session.user,img:thumb})
});
router.post('/addComm',async (req,res)=>{
    console.log(req.body);
    var thumb = new Buffer.from(req.session.user.img.data).toString('base64');
    res.render('test',{
        "user":req.session.user,
        img: thumb
    })
})

module.exports = router;