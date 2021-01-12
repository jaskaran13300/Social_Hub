const mongoose = require("mongoose");
const validator = require("validator");



var communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        default: "active"
    },
    method:{
        type: String,
        lowercase: true,
        default: "direct"
    },
    location:{
        type:String,
        default:"Not Added"
    },
    description:{
        type:String
    },
    members:[
        {
            user_email:{
                type:String
            },
            user:{
                type:String
            },
            name:{
                type:String
            }
        }
    ],
    owner:{
        id:{
            type:String
        },
        name:{
            type:String
        },
        email:{
            type:String
        }
    },
    img_path: {
        type:String,
        default:"community.png"
    }

    },
    {
        timestamps: true
    }
);

const community = mongoose.model("community", communitySchema);




communitySchema.methods.addCommunity = async function (newComm) {
    const comm = newComm
    try {
        await comm.save();
    }
    catch (error) {
        console.log(error);
    }

}


module.exports = community;