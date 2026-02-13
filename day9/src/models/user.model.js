const mongoose = require("mongoose");


// create userSchema 
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }

})

// create user model
const userModel = mongoose.model("user",userSchema);

// export model 
module.exports = userModel;