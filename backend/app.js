const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Get routes object=> to get access to the routes
const fileRoutes = require('./routes/file-routes');
const app = express();

// Connecting to MongoDB
const url = "mongodb://localhost:27017/MEANStackFileUploading";
mongoose.connect(url , (err, db) => {
  if(err) throw err;
  console.log("DB is Connected");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use(cors());

// Middlewate to get routes 
app.use('/api/files', fileRoutes);

// app is exported to the server.js
module.exports = app;
