const express = require("express");
const User = require("../models/user");
const router = express.Router();
const upload = require("../controllers/multer")
const community=require("../models/community")
router.get("/",async (req,res)=>{
        res.render("adminProfile", {
            user: req.session.user,
        })

}); 


router.get("/communities",async (req,res)=>{
    res.render("communityPanel",{user: req.session.user})
});

router.get("/AddCommunity",(req,res)=>{
    res.render("AddCommunity",{user: req.session.user})
});
router.post('/addComm',upload.single('profilePic'),async (req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    var comm = new community();
    comm.name = req.body.name;
    comm.description = req.body.trumbowyg;
    comm.method = req.body.method;
    comm.owner.email = req.session.user.email;
    comm.owner.name = req.session.user.name;
    comm.owner.id = req.session.user._id;
    if (req.file)
        comm.img_path = req.body.name+".jpg";

    try {
        const commu = await comm.save();
        console.log(commu);
        res.render("AddCommunity", {
            user: req.session.user
        });
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;