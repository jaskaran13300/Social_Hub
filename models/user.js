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
        path:{
            type:String,
            default:"default.png"
        },
        status:{
            type:String,
            lowercase:true,
            default:"pending"
        },
        restrict:{
            type:String,
            default:"0"
        },
        first:{
            type:Boolean,
            default:true
        }
        
    },
    {
        timestamps: true
    }
    );

const user = mongoose.model("users", userSchema);




userSchema.methods.addUser = async function (newUser) {
    const userr=newUser
    try{
        await userr.save();
    }
    catch(error){
        console.log(error);
    }
    
}


module.exports = user;