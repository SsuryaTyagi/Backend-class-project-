// require app from app.js
const app = require("./src/app");
const connectToDb = require("./src/config/database")


// database function call
connectToDb()


// start server 
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})