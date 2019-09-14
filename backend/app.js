const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Get routes object=> to get access to the routes
const postRoutes = require('./routes/post-routes');
const app = express();

// Connecting to MongoDB
const url = "mongodb://localhost:27017/MEANStackCRUDOperations";
mongoose.connect(url , (err, db) => {
  if(err) throw err;
  console.log("DB is Connected");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(cors());

// Middlewate to get routes 
app.use('/api/posts', postRoutes);

// app is exported to the server.js
module.exports = app;
