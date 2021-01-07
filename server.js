require("./db/db");
var fs = require("fs");
var express=require('express')
var path = require('path')
var bodyparser = require('body-parser')
var app=express(); 
var ejs = require("ejs");
var expressLayouts = require('express-ejs-layouts');
var port=5000 || process.env.PORT;
const User = require('./models/user')
const auth = require("./middlewares/auth")
const admin_auth = require("./middlewares/admin_auth");
app.use(expressLayouts);
const user = require('./models/user');
const multer = require('multer');

const session = require("express-session");
app.use(
    session({
        secret: "jwt",
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 3600000
        }
    })
);

const adminRouter = require('./routers/adminRouter');
const loginRouter=require('./routers/loginRouter');
const communityRouter = require('./routers/communityRouter');


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/adminLayout');

app.get('/',(req, res) =>{
    if(req.session.loggedIn == "1"){
        if(req.session.user.role=="admin"){
            res.redirect("/admin");
        }else if(req.session.user.role=="community_builder"){
            res.redirect("/community_builder");
        }else{
            res.redirect("/user");
        }
    }else{
        res.sendFile(path.join(__dirname, '/public/login.html'));
    }
});

app.listen(port,()=>{
    console.log(`App is running on port `+port);
});


app.use(bodyparser.json());

const setLayout = (req, res, next) => {
    if (req.session.loggedIn == "1") {
        if (req.session.user.role == 'admin') {
            app.set('layout', 'layouts/adminLayout');
        } else if (req.session.user.role == 'community_builder') {
            app.set('layout', 'layouts/cbLayout');
        } else {
            app.set('layout', 'layouts/userLayout');
        }
        next();
    } else {
        res.redirect("/");
    }
}

app.use('/login',loginRouter);
app.use("/admin",setLayout,admin_auth,adminRouter);
app.use("/community_builder",setLayout,communityRouter);






app.get('/logout',(req,res)=>{
    req.session.loggedIn = "";
    req.session.user=null;
    res.redirect("/");
});

app.get('/changepassword',setLayout,(req,res)=>{
    var thumb = new Buffer(req.session.user.img.data).toString('base64');
        res.render('changepass', {
            password:req.session.user.password,
            user:req.session.user,
            img:thumb
        });

})

app.post('/changepassword',setLayout,async (req,res)=>{
    
    try{
        const user = await User.findOneAndUpdate({email:req.session.user.email},req.body,{new:true});
        req.session.user = user;
        res.send("1");
    }catch(err){
        res.send("err");
    }
});

app.get('/edit',setLayout, async (req, res) => {
    var thumb = new Buffer(req.session.user.img.data).toString('base64');
        res.render('edit', {
            user: req.session.user,
            img:thumb
        })
})

app.get('/update',setLayout, async (req, res) => {
    var thumb = new Buffer(req.session.user.img.data).toString('base64');

        res.render('update', {
            user: req.session.user,img:thumb
        });
});


const upload = multer({
    limit: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return cb(new Error('File Should be an image'));
        }
        cb(undefined, true);
    }
})


app.post("/update", upload.single('myImage'),setLayout, async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    var obj = new Object();
    if(req.file){
        obj={
            body:req.body,
            img:{
                data:req.file.buffer
            }
        }
    }else{
        obj.name = req.body.name;
        
    }
    console.log(obj);
    try {
        const person = await user.findOneAndUpdate({ email: req.session.user.email }, obj , { new: true })
        req.session.user = person;
        
        res.redirect("/");
    } catch (err) {
        console.log(err);
        var thumb = new Buffer(req.session.user.img.data).toString('base64');
        res.render("test",{
            user: req.session.user,
            img:thumb
        });
    }

})

app.get("/test",(req, res) => {



    User.findOne({email:req.session.user.email},(err,users)=>{
        console.log(users);
    })

    console.log(req.session.user.img.data);
    var thumb = new Buffer(req.session.user.img.data).toString('base64');

    res.render("test",{ 
        user:req.session.user,
        img:thumb
    });

});