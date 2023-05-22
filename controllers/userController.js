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

        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: true
        });

        req.flash("success","Account Created");
        return res.redirect('/user/sign-in');

    } catch (err){
        // console.log("Error in creating User",err);
        req.flash("error",err);
        return res.redirect('back');
    }
}

module.exports.signUP = function(req,res){
    return res.render('User_sign_up',{
        title: 'Sign Up'
    })
   
};

module.exports.signIN = async function(req,res){
    try{
        console.log(req.body);
        let user = await User.findOne({email : req.body.email});

        if(req.body.password == user.password){
            if(req.body.adminCode == '1234'){
                user.isAdmin = true;
                return res.render('/admin');
            }
            console.log("Welcome");
            return res.render('/user/review');
        }
    }catch(err){
        // console.log("Error in signing in");
        req.flash('success',"")
        return res.redirect('<h1>ERRRRRRR</h1>');
    }
}