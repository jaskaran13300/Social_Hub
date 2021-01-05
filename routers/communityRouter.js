const express = require("express");
var router = express.Router();

router.get("/",(req,res)=>{
    res.render("adminProfile",{
        user: req.session.user
    })
}); 

router.get("/communities",(req,res)=>{
    res.render();
});

module.exports = router;