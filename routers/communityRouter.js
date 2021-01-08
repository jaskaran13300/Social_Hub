const express = require("express");
const User = require("../models/user");
const router = express.Router();
const upload = require("../controllers/multer")
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
        comm.img.data = req.file.buffer;

    try {
        const commu = await comm.save();
        console.log(commu);
        var thumb = new Buffer.from(req.session.user.img.data).toString('base64');
        res.render("test", {
            user: req.session.user,
            img: thumb
        });
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;