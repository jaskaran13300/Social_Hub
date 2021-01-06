require("./db/db");
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


const session = require("express-session");
app.use(
    session({
        secret: "jwt",
        resave: false,
        saveUninitialized: true
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

app.get('/changepassword',auth,(req,res)=>{
    res.render('changepass',{
        password:req.session.user.password,
        user:req.session.user
    });
})

app.post('/changepassword',auth,async (req,res)=>{
    var newvalues = {
        $set: {
         password: req.body.password
        }
    };
    // console.log(req.body);
    try{
        const user = await User.findOneAndUpdate({email:req.session.user.email},req.body,{new:true});
        req.session.user = user;
        res.send("1");
    }catch(err){
        res.send("err");
    }
});

app.get('/edit',auth, async (req, res) => {
    res.render('edit', {
        "user": req.session.user
    })
})

app.get('/update',auth, async (req, res) => {
    res.render("update", {
        "user": req.session.user
    });
});

app.post("/update",auth, async (req, res) => {
    try {
        const person = await user.findOneAndUpdate({ email: req.session.user.email }, req.body, { new: true })
        req.session.user = person;
        if(req.session.user.role=="admin")
            res.send("1");
        else if(req.session.user.role=="community_builder")
            res.send("2");
        else {
            res.send("0")
        }
    } catch (err) {
        console.log(err);
        res.send("err");
    }

})