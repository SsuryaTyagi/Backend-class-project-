// require app with app.js file 
const app = require("./src/app");
const connectToDb = require("./src/config/database")


// call connectToDb function 
connectToDb();

// server start 
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})