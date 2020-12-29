const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const auth=require('../middlewares/auth');
const admin_auth=require('../middlewares/admin_auth');
const user = require("../models/user");

router.get('/',async (req,res)=>{
    res.render('adminProfile',{
        "user":req.session.user
    });
});

router.get('/add',async (req,res)=>{
    console.log("****",req.session.user);
    res.render('add',{
        "user":req.session.user
    })
})

router.post('/add',async (req,res)=>{
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

router.get('/edit',async(req,res)=>{
    res.render('edit',{
        "user":req.session.user
    })    
})

router.get('/update',async (req,res)=>{
    res.render("update",{
        user:req.session.user
    });
});

router.post("/update",async (req,res)=>{
        try{
            const person = await user.findOneAndUpdate({email:req.session.user.email},req.body,{new:true})
            req.session.user=person;
            res.send("1");
        }catch(err){
            console.log(err);
            res.send("err");
        }

})

module.exports = router;
