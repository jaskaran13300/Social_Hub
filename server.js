require("./db/db");
var express=require('express')
var path = require('path')
var bodyparser = require('body-parser')
var app=express();
var port=5000 || process.env.PORT;
const user = require('./models/user');
const adminRouter = require('./routers/adminRouter');
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port,()=>{
    console.log(`App is running on port `+port);
});

app.use(bodyparser.json());


app.post('/login',(req,res)=>{
    console.log(req.body.email);

    user.findOne({email: req.body.email}).then((user)=>{
        if(user){
            if(user.password == req.body.password){
                res.send(JSON.stringify(user.role));
            }else{
                res.send(JSON.stringify("incorrect"));
            }
        }else{
            res.send(JSON.stringify("not found"));
        }
        console.log(user);
    }).catch(err=>{
        res.send(JSON.stringify("err"));
    });
});

app.use("/admin",adminRouter);