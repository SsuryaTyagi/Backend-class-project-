// require app with app.js file
const app = require("./app");
const mongoose = require("mongoose")
 
const connectToDb = ()=>{
    mongoose.connect("")
    .then(()=>{
        console.log("database in connected...")
    }).catch(()=>{
        console.log("database in connected...")
    })
}
connectToDb();
// start server 
app.listen(3000,()=>{
    console.log("http://localhost:3000")
})