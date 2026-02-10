// require express with express
const express = require("express");
const model = require("./models/notes.model")

// create server with express 
const app = express();

app.use(express.json());

// create api 
app.post("/notes",async(req,res)=>{
    const{title,description} = req.body
   const note = await model.create({
        title,description,
    })

    res.status(201).json({
        message:"user created",
        note,
    })
})
// export app 
module.exports = app