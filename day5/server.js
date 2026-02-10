// require app with app.js file
const app = require("./app");
const mongoose = require("mongoose")
 
const connectToDb = ()=>{
    mongoose.connect("mongodb+srv://surya:RSlH98S85L4oc87m@cluster0.j7kporq.mongodb.net/day5")
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