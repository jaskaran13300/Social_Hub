var express=require('express')
var app=express();
var port=5000 || process.env.PORT;
app.listen(port,()=>{
    console.log(`App is running on port `+port);
});