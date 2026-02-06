const express = require("express");
const app = express();

app.use(express.json());
const notes = [];

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/notes",(req,res)=>{
    notes.push(req.body);
    res.send("notes created ....")
});

app.get("/notes",(req,res)=>{
    res.send(notes)
});

app.patch("/notes/:index",(req,res)=>{
    const index = req.params.index
    notes[index].age = req.body.age
    res.send(notes)
});

app.delete("/notes/:index",(req,res)=>{
    const index = req.params.index
    delete notes[index];

    res.send(notes);
})


module.exports = app;