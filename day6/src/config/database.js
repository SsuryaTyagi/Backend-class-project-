require('dotenv').config()
const mongoose = require("mongoose");


const connectToDb = ()=>{
    mongoose.connect(process.env.MONGOOS_URL)
    .then(()=>{
        console.log("database is connected...")
    }).catch(()=>{
        console.log("database in notconnected...")    
    })
}

module.exports = connectToDb