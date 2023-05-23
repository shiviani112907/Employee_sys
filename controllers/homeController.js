const User = require('../models/user');
const Reviews = require('../models/review');

module.exports.home = async function(req,res){
    try{

        // Checking for authorization
        if (!req.isAuthenticated()) {
            req.flash('error' , 'Please LogIn !');
            
            return res.redirect('/user/sign-in');
        }
        // Fetching the user and review from the form
        let user = await User.findById(req.user.id);
        let review = await Reviews.find({ reviewer: req.user.id });
        console.log(review);

        // taking all the necessary part of recipent user in recipent array so that we can pass it as a varibalbe'
        let toReview = [];
        for(let i = 0; i < user.toReview.length ; i++){
            let userName = await User.findById(user.toReview[i]);
            toReview.push(userName);
        }
        // Taking all the necessary imformation of the reviewers in review array, and passing it in homePage
        let myReviews = [];
        for(let i = 0; i < review.length ; i++){
            let reviewUser = await User.findById(review[i].reviewee);
            console.log(review); 
            if(reviewUser != null){
                let currUser = {
                    name : reviewUser.name,
                    content : review[i].content
                }
                myReviews.push(currUser);
            }
        }
        
        let title;
        if(req.user.isAdmin){
            title = "Admin View";
        }
        else{
            title = "Employee View";
        }
       
        // Render the page, with the variable made above , and pass them as the argument
        return res.render('home', {
            title: title,
            toReview : toReview,
            myReviews: myReviews,
            user: user
          });

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
};
