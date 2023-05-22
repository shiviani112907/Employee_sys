const User = require('../models/user');

// Get sign-up data and create a new user
module.exports.create = async function(req,res){
    try{
        // console.log(req.body);
        if(req.body.password != req.body.confirm_password){
            // console.log('Password dont match');
            req.flash("error",'Please enter the same password in confirm password');
            return res.redirect('back');
        }
        
        let existingUser = await User.findOne({ email: req.body.email });
        
        if(existingUser){
            req.flash("error","Email is already Associated with another user");
            return res.redirect('back');
        }
        else{
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false
            });
            
            req.flash("success","Account Created");
            return res.redirect('/user/sign-in');
        }
    } catch (err){
        // console.log("Error in creating User",err);
        req.flash("error",err);
        return res.redirect('back');
    }
}

module.exports.signUP = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('User_sign_up',{
        title: 'Sign Up'
    })
    
};

module.exports.signIN = async function(req,res){
    return res.render('user_sign_in',{
        title : "Sign In"
    });
    
    
};

module.exports.createSession = async function(req,res){
    req.flash("success","Logged in Succesfully!");
    
    // console.log(`${req.body} in create`);
    return res.redirect('/');
};
