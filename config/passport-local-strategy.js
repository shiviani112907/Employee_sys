const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async function(req,email,password,done){
    try{
        let user = await User.findOne({email:email});

        if(!user || user.password != password){
            req.flash("error","Invalid Username/Password")
             return done(null,false);
         }

         return done(null,user);

    } catch(err){
        console.log("Error in finding user",err);
             return done(err);
    }
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(async function(id,done){
    try{
        let user = await User.findById(id);
        done(null,user);
    } catch(err) {
        console.log("Error in finding User -----> Passport");
        done(err);
    }
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/user/sign-in');
};

passport.setAuthenticatedUser= function(req,res,next){
    if(req.isAuthenticated()){
        // req.user conatins the current signed in user from the
        // session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    return next();
};

module.exports = passport;