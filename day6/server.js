const app = require("./src/app");
const connectToDb = require("./src/config/database")

// database funtion call
connectToDb();

app.listen(3000,()=>{
    console.log("http://localhost:3000");  
})