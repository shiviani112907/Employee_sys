//Importing Framework
const express = require('express');
const db = require('./config/mongoose');

//For flash messages
const flash = require('connect-flash');
const customMW = require('./config/flash_midddleware');

const app = express();
const port = 5000;

//Importing template engine
const expressLayout = require('express-ejs-layouts');

// Body parser
app.use(express.urlencoded({extended:true}));
app.use(express.static('./assets'));

app.use(expressLayout);
// Enables the use of external styles and scripts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Setting view Engine
app.set('view engine','ejs');
app.set('views','./views')

// Using express for routing
app.use('/',require('./routes/index'));


app.listen(port,function(err){

    if(err){
        console.log("Error in running the server");
        return;
    }
    console.log("Server Up and Running on port :: ",port);
});