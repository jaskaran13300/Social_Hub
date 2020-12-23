const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get('/',async (req,res)=>{
    res.send("Hi admin!");
});

module.exports = router;
