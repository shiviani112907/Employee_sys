//Importing models
const Reviews = require('../models/review');
const User = require('../models/user');


// Send and receive reviews
module.exports.List = async function(req,res){

    try{

        // Find the person who is reviewed
        let recipient = await User.findById(req.params.id);

        // Check for valid users
        if(!recipient){
            console.log("User not Valid!!");
            return res.redirect('/');
        }

        // Update whom to review
        for(let i = 0; i < req.user.toReview.length; i++){

            if(req.user.toReview[i] == recipient.id){

                let deleted = req.user.toReview.splice(i,1);

                req.user.save();
            }
        }

        //Shows the reviews
        for(let i = 0 ;i < recipient.reviewFrom.length; i++){

            // user logged in
            if(req.user){
                if(recipient.reviewFrom[i] == req.user.id){
                    req.user.toReview.pop(i);

                    try{
                        // Create new reviews
                    const newReview = await Reviews.create({
                        reviewee : req.user.id,
                        reviewer : recipient.id,
                        content: req.query.newReview,
                    });

                    // On success
                    req.flash("success",` Review Sent to ${recipient.name}`)
                    return res.redirect('/');

                } catch(err){
                    // On failure
                    console.log("Review not created!");
                    return res.redirect('back');
                }

                }
            }
            else{
                // If user not logged in
                console.log("user not logged in");
                req.flash('error','Please Login to Review !');
                return res.redirect('/user/sign-in');
            }
        }
        // On success
        return res.redirect('/');
    }catch(err){

        // On failure
        console.log('Error in fetching Review',err);
        return;
    }
}