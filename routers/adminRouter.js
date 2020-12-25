const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const auth=require('../middlewares/auth')
router.get('/',auth,async (req,res)=>{
    res.render('adminProfile',{
        "user":req.session.user
    });
});

router.get('/add',auth,async (req,res)=>{
    res.render('add',{
        "user":req.session.user
    })
})

router.post('/add',auth,async (req,res)=>{
    console.log(req.body.fullname)
    res.send("post add called")
})

module.exports = router;
