var express=require('express')
var path = require('path')
var app=express();
var port=5000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port,()=>{
    console.log(`App is running on port `+port);
});