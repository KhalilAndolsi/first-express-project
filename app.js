// import dotenv library to use .env file to hide a specific environment variable
require("dotenv").config();
// import express framework to use express
const express = require("express");

const cors = require("cors");

//import mongoose library to use mongoose
const mongoose = require("mongoose");
// create the express app 
const app = express();
app.use(cors());
// import the routes (endPoints) file
const notesRoutes = require("./routes/notesRoutes")
// port of localHost server
const port = process.env.PORT || 5000;
// to can use json for send responses or get requests
app.use(express.json());

// connect with database using mongoose library
mongoose.connect(process.env.MONGODB_URI);

// get response by cooncet with database
const db = mongoose.connection;

// handle error of connection with database
db.on("error", () => console.log("Connection error!"));
// handle success message of connection with database
db.once("open", () => console.log("Connection successfuly."));

// use express application the routes (endPoints) file has imported before
app.use(notesRoutes);

// run the server by using the port number
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
