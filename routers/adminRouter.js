const express = require("express");
var router = express.Router();
const user = require("../models/user");
const sendMailto=require('../nodemailer/mail')


router.get('/',async (req,res)=>{
    // console.log("Admin router************")
    // console.log(req.session.img);
    var thumb = new Buffer.from(req.session.user.img.data).toString('base64');
        res.render('adminProfile', {
            user: req.session.user,
            img:thumb
        });

});

router.get('/add',async (req,res)=>{
    var thumb = new Buffer.from(req.session.user.img.data).toString('base64');
        res.render('add', {
            user: req.session.user,
            img:thumb
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




router.get("/userlist",async (req, res)=>{
    var thumb = new Buffer.from(req.session.user.img.data).toString('base64');
    res.render("userlist", { user:req.session.user,img:thumb });

})


router.post('/users', function (req, res) {
    var count;
    var string = JSON.stringify('order[0][column]');// which column
    var objectValue = JSON.parse(string);
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
        if (sortOrder == "asc")
            getdata("status", 1);
        else
            getdata("status", -1);
    }
    else if (order[0] == 4) {
        if (sortOrder == "asc")
            getdata("role", 1);
        else
            getdata("role", -1);
    }

    else {
        getdata("email", 1);
    }


    function getdata(colname, sortorder) {
        
        user.countDocuments(function (e, count) {
            // console.log("***********",e,count); // count is total number of docs

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
            // console.log(role, status,"*************");
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
                    // console.log("******",data,"********")
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
    // 
    sendMailto(req.body.email,req.body.subject,req.body.text,(data)=>{
        if(data.error){
            res.send("0");
        }
        else if(data.response){
            res.send("1")
        }
        else{
            res.send("-1")
        }
    })
})


router.post('/updateuserlist',async (req,res)=>{
    // console.log(req.body);
    await user.findByIdAndUpdate(req.body._id, req.body, {runValidators:true, new:true },(err,result)=>{
        if(err){
            console.log(err);
            res.send("0");
        }
        else{
            console.log(result);
            res.send("1")
        }
    })
    
})

router.post('/restrict', async (req, res) => {
    await user.findByIdAndUpdate(req.body._id, req.body, { runValidators: true, new: true }, (err, result) => {
        if (err) {
            console.log(err);
            res.send("-1");
        }
        else {
            if(result.restrict=="1") //user deactiviate
                res.send("1")
            else //user activate
            res.send("0")
        }
    })
})


module.exports = router;
