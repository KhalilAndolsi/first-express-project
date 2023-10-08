const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String , required: false, default: ""},
  createdAt: {type: Date, default: new Date().toJSON()},
  lastUpdate: {type: Date, default: new Date().toJSON()},
})

module.exports = mongoose.model("Notes", notesSchema)