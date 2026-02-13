const mongoose = require("mongoose");
require("dotenv").config()


const connectToDb = ()=>{
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("database is connected...");
    }).catch(()=>{
        console.log("database is Notconnected...");
    })
}


module.exports = connectToDb;