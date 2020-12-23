const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    }
});

const user = mongoose.model("users", userSchema);

module.exports = user;