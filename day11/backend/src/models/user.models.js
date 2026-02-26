const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username is already exists"],
        required:[true,"username is require"]
    },
    email:{
        type:String,
        unique:[true,"email is already exists"],
        required:[true,"email is require"]
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profile_img:{
        type:String,
        difault:"https://ik.imagekit.io/gb1lyvp8q/default-avatar-profile-icon-social-media-user-vector-49816613.avif"
    }
});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;