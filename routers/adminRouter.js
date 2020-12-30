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

    user.findOne({ email:req.body.email}).then( async userr=>{
        if(userr){
            return res.send("0");
        }else{
            const person=new user(req.body);
            try{
                await person.save()
                res.end("1")
            }
            catch(error){
                console.log(error)
                res.end("-1");
            }
        }
    });
    
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




router.get("/userlist",async (req, res)=>{
    res.render("userlist",{user:req.session.user});
})


router.post('/users', function (req, res) {
    var count;
    console.log("****",req.body);
    var string = JSON.stringify('order[0][column]');// which column
    var objectValue = JSON.parse(string);
    // console.log(req.body[objectValue]);
    var order=req.body[objectValue];// column number
    string = JSON.stringify('order[0][dir]');// asc or desc
    objectValue = JSON.parse(string);
    var sortOrder = req.body[objectValue];// sort order asc or desc
    if (order == "0") {
        if (sortOrder == "asc")
            getdata("email", 1);
        else
            getdata("email", -1);
    }
    else if (order == "1") {
        if (sortOrder == "asc")
            getdata("phone", 1);
        else
            getdata("phone", -1);
    }
    else if (order == 2) {
        if (sortOrder == "asc")
            getdata("city", 1);
        else
            getdata("city", -1);
    }
    else if (order == 3) {
        if (sortOrder[0] == "asc")
            getdata("status", 1);
        else
            getdata("status", -1);
    }
    else if (order[0] == 4) {
        if (sortOrder[0] == "asc")
            getdata("role", 1);
        else
            getdata("role", -1);
    }

    else {
        getdata("email", 1);
    }


    function getdata(colname, sortorder) {
        
        user.countDocuments(function (e, count) {
            console.log("***********",e,count);

            var start = parseInt(req.body.start);
            var len = parseInt(req.body.length);
            var role = req.body.role;
            var status = req.body.status;
            var string = JSON.stringify('search[value]');
            var objectValue = JSON.parse(string);
            var search = req.body[objectValue];
            var getcount = 10;
            // console.log(req.body.search.value.length);


            var findobj = {};
            console.log(role, status,"*************");
            if (role != 'All') {
                findobj.role = role;
            }
            else {
                delete findobj["role"];
            }
            if (status != "All") { findobj.status = status; }
            else {
                delete findobj["status"];
            }
            if (search != '')
                findobj["$or"] = [{
                    "email": { '$regex': search, '$options': 'i' }
                }, {
                    "city": { '$regex': search, '$options': 'i' }
                },
                {
                    "phone": { '$regex': search, '$options': 'i' }
                }
                , {
                "status": { '$regex': search, '$options': 'i' }
                }
                    , {
                    "role": { '$regex': search, '$options': 'i' }
                }]
            else {
                delete findobj["$or"];
            }


            user.find(findobj).countDocuments(function (e, coun) {
                getcount = coun;
            }).catch(err => {
                console.error(err)
                res.send(err)
            })

            user.find(findobj).skip(start).limit(len).sort({ [colname]: sortorder })
                .then(data => {
                    console.log(data)
                    res.send({ "recordsTotal": count, "recordsFiltered": getcount, data })
                })
                .catch(err => {
                    console.error(err)
                    //  res.send(error)
                })
        });
    }
})



router.post('/mail',async (req,res)=>{
    res.send("1")
})


router.post('/updateuserlist',async (req,res)=>{
    res.send("1")
})

router.post('/restrict', async (req, res) => {
    res.send("0")
})


module.exports = router;
