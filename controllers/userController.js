const User = require('../models/user');

module.exports.home = async function(req,res){
    let user = await User.find({email:req.body.email});
    return res.render('home',{
        title: "Employee View",
        user:user
    })
};

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

    if(req.isAuthenticated){
        if(req.isAuthenticated()){
            return res.redirect('/');
        }
    }

    return res.render('user_sign_in',{
        title : "Sign In"
    });
    
    
};

module.exports.createSession = async function(req,res){
    // let person = req.user;
    req.flash("success","Logged in Succesfully!");

    // console.log(req.body,'\n',person.isAdmin);

    let user = await User.findOne({email:req.body.email});

    if (req.body.adminCode == 1234 &&  person.isAdmin){
        // user.isAdmin = true;
        return res.redirect('/');
    }

    return res.redirect('/');
};

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if (err) { return next(err); }
        req.flash("success","You have Logged Out!");
        res.redirect('/');
    });
};

module.exports.forgetPasswordPage = function(req, res){
    req.flash("success","Reset password link has been send to the email!!")
    return res.redirect("back");
}
