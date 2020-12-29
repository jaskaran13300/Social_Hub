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


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/adminLayout');



app.listen(port,()=>{
    console.log(`App is running on port `+port);
});

app.use(bodyparser.json());
app.use('/login',loginRouter);
app.use("/admin",auth,admin_auth,adminRouter);

app.get('/test',(req,res)=>{
    User.findOne({email:"davnish99@gmail.com"}).then(user=>{
        if(user){
                res.render('test',{user:user});
        }

    }).catch(err=>{console.log(err);})

})

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