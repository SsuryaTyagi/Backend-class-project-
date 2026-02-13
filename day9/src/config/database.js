// require mongoose 
const mongoose = require("mongoose");
require("dotenv").config()

// create function to connecte database
const connectToDb = ()=>{
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("database is connected...");
    }).catch(()=>{
        console.log("database is notConnected...");    
    })
}

// export connectToDb
module.exports = connectToDb;