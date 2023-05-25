// Importing Models
const User = require('../models/user');


// Get sign-up data and create a new user
module.exports.create = async function(req,res){
    try{

        //If password doesn't match
        if(req.body.password != req.body.confirm_password){
            req.flash("error",'Please enter the same password in confirm password');
            return res.redirect('back');
        }
        
        //If user exists
        let existingUser = await User.findOne({ email: req.body.email });
        if(existingUser){
            req.flash("error","Email is already Associated with another user");
            return res.redirect('back');
        }
        else{

            // Create new user if it doesn't exist
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false
            });
            
            // On success
            req.flash("success","Account Created");
            return res.redirect('/user/sign-in');
        }
    } catch (err){
        //On failure
        console.log("Error in creating User",err);
        req.flash("error",'Error in creating User');
        return res.redirect('back');
    }
}


// To sign-up
module.exports.signUP = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('User_sign_up',{
        title: 'Sign Up'
    })
    
};

//To sign-in
module.exports.signIN = async function(req,res){

    if(req.isAuthenticated){
        if(req.isAuthenticated()){
            return res.redirect('/');
        }
    }

    return res.render('user_sign_in',{
        title : "Sign In"
    });
    
    
};


//Logs in user and create new
module.exports.createSession = async function(req,res){

    let person = req.user;
    req.flash("success","Logged in Succesfully!");

    if (req.body.adminCode == 1234 &&  person.isAdmin){
        // user.isAdmin = true;
        return res.redirect('/');
    }

    return res.redirect('/');
};

// Sign-out user
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if (err) { return next(err); }
        req.flash("success","You have Logged Out!");
        res.redirect('/');
    });
};


//If password is forgotten
module.exports.forgetPasswordPage = function(req, res){
    req.flash("success","Reset password link has been send to the email!!")
    return res.redirect("back");
}
