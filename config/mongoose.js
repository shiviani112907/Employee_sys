const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Riteshk229:9693640242@cluster0.lucaj3w.mongodb.net/ERS?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error on connecting to db"));

db.once('open',function(){
    console.log("Connected to Database :: MondoDB");
});

module.exports = db;