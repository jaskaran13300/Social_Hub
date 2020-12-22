var express=require('express')
var app=express();
var port=5000;
app.listen(port,()=>{
    console.log(`App is running on port `+port);
})