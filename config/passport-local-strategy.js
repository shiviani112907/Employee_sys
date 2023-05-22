const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
},function(req,email,password,done){

    User.findOne({email:email}).then(function(user,err){
        if(err){
            req.flash("error",err);
             return done(err);
         }
         if(!user || user.password != password){
            req.flash("error","Invalid Username/Password")
             return done(null,false);
         }

         return done(null,user);
     });
}));

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/user/sign-in');
};

module.exports = passport;