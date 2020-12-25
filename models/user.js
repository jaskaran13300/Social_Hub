const mongoose = require("mongoose");
const validator=require("validator");
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address');
            }
        }
    },
    password: {
        type: String,
        required:true,
        trim:true,

    },
    gender:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
    },
    dob:{
        type:String
    },
    phone:{
        type:String,
        validate(value){
            if(value.length!=10){
                throw new Error("Phone Number should be of length 10");
            }
            else if(!validator.isNumeric(value)){
                throw new Error("Invalid Phone Number");
            }
        }
    },
    role: {
        type: String,
        lowercase:true,
        default: "user"
    },
    image_name:{
        type:String,
        default:"default.png"
    }
});

const user = mongoose.model("users", userSchema);

module.exports = user;