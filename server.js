require("./db/db");
var express=require('express')
var path = require('path')
var bodyparser = require('body-parser')
var app=express();
var ejs = require("ejs");
var port=5000 || process.env.PORT;
const user = require('./models/user');

const adminRouter = require('./routers/adminRouter');
const loginRouter=require('./routers/loginRouter');

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(port,()=>{
    console.log(`App is running on port `+port);
});

app.use(bodyparser.json());
app.use('/login',loginRouter);
app.use("/admin",adminRouter);
