const mongoose = require('mongoose');

// Connects to Atlas
mongoose.connect('mongodb+srv://guptashivi516:Shivi@cluster0.mb1eg4e.mongodb.net/emp_sys?retryWrites=true&w=majority');

// check for connection
const db = mongoose.connection;

// If not connected
db.on('error',console.error.bind(console,"Error on connecting to db"));

// if connected
db.once('open',function(){
    console.log("Connected to Database :: MondoDB");
});

// exports database
module.exports = db;