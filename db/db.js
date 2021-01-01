const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/SocialHub',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
  useCreateIndex:true
}, err => {
  if (!err) {
    console.log("MongoDB Connection Successful");
  } else {
    console.log("Error in DB connection : " + err);
  }
});
// require("../models/user.model");