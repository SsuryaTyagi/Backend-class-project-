require("dotenv").config()
const mongoose = require("mongoose");

const connectToDb = ()=>{
    mongoose.connect(process.env.MONGOOSE_URI)
    .then(()=>{
        console.log("DATABASE IS CONNECTED...")
    }).catch(()=>{
        console.log("DATABASE IS NOT CONNECTED...")  
    })
}

module.exports = connectToDb