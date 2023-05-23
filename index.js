//Importing Framework
const express = require('express');
const db = require('./config/mongoose');

//For flash messages
const session = require('express-session');
const MongoStore =  require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const customMW = require('./config/flash_midddleware');

// For Authentication
const cookie = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


//Starts express
const app = express();
const port = 5000;

//Importing template engine
const expressLayout = require('express-ejs-layouts');

// Body parser
app.use(express.urlencoded({extended:true}));

// Cookie parser
app.use(cookie());

//For static files
app.use(express.static('./assets'));


app.use(expressLayout);
// Enables the use of external styles and scripts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Setting view Engine
app.set('view engine','ejs');
app.set('views','./views')

// Create sessions for authentication and flash messages
app.use(session({
    name: "ERS",
    secret: "EmployeeReviewSystem",
    saveUninitialized: false,
    resave: false,
    Cookie :{
        maxAge: (1000*60*100)
    },
    store : new MongoStore({
        uri : "mongodb+srv://Riteshk229:9693640242@cluster0.lucaj3w.mongodb.net/ERS?retryWrites=true&w=majority",
        autoRemove: 'disabled'
    },(err) => {
        console.log(err || 'Connected to MongoStore');
    })
}));


// Enables Authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Enable flash notifications
app.use(flash());
app.use(customMW.setFlash);

// Using express for routing
app.use('/',require('./routes/index'));


app.listen(port,function(err){

    if(err){
        console.log("Error in running the server");
        return;
    }
    console.log("Server Up and Running on port :: ",port);
});