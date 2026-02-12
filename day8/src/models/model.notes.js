const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title:String,
    description:String
})

const noteModel = mongoose.model("notes",notesSchema)

module.exports = noteModel;