const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const auth=require('../middlewares/auth');
const admin_auth=require('../middlewares/admin_auth');
const user = require("../models/user");

router.get('/',auth,async (req,res)=>{
    res.render('adminProfile',{
        "user":req.session.user
    });
});

router.get('/add', auth, admin_auth,async (req,res)=>{
    console.log("****",req.session.user);
    res.render('add',{
        
        "user":req.session.user
    })
})

router.post('/add', auth, admin_auth,async (req,res)=>{
    const person=new user(req.body);
    try{
        await person.save()
        return res.send("1")
    }
    catch(error){
        console.log(error)
        return res.send("0");
    }    
})

router.get('/edit',auth,async(req,res)=>{
    res.render('edit',{
        "user":req.session.user
    })    
})

module.exports = router;
