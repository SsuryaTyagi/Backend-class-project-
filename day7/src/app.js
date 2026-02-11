// require express
const express = require("express");
const noteModel = require("./models/notes.model")

// create server
const app = express();

// Middleware
app.use(express.json());


// create routes 
app.post("/",async(req,res)=>{
    const {title,description} = req.body;

    const notes =await noteModel.create({title,description});

    res.status(201).json({
        message:"user created ...",
        notes,
    })

})

// export app
module.exports = app;