// require express
const express = require("express");
const cors = require("cors");
const noteModel = require("./models/notes.model");

// create server
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// create routes 
app.post("/notes",async(req,res)=>{
    const {title,description} = req.body;

    const notes =await noteModel.create({title,description});

    res.status(201).json({
        message:"user created ...",
        notes,
    })

});

// get notes api 
app.get("/notes",async(req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Notes fetched seccessfully.",
        notes,
    })
});

// delete notes api 
app.delete("/notes/:id",async(req,res)=>{
    const index = req.params.id

    await noteModel.findByIdAndDelete(index)

    res.status(200).json({
        message:"note deleted successfully."
    })
    
})
// patch notes api 
app.patch("/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {description} = req.body
    
    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"note update successfully."
    })
})




// export app
module.exports = app;