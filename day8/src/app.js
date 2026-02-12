const express = require("express");
const noteModel = require("./models/model.notes")

const app = express();

app.use(express.json());

// api 
app.post("/notes", async(req,res)=>{
    const {title,description} = req.body 

    const note = await noteModel.create({title,description})

    res.status(201).json({
        message:"user created...",
        note
    })

})





module.exports = app;