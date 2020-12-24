const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get('/',async (req,res)=>{
    res.render('adminProfile',{
        
    });
});

module.exports = router;
