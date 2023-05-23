const Reviews = require('../models/review');
const User = require('../models/user');

module.exports.List = async function(req,res){
    try{

        // find the person who is reviewed
        let recipient = await User.findById(req.params.id);

        // check for valid users
        if(!recipient){
            console.log("User not Valid!!");
            return res.redirect('/');
        }

        for(let i = 0; i < req.user.toReview.length; i++){

            if(req.user.toReview[i] == recipient.id){

                let deleted = req.user.toReview.splice(i,1);

                req.user.save();
            }
        }

        for(let i = 0 ;i < recipient.reviewFrom.length; i++){
            if(req.user){
                if(recipient.reviewFrom[i] == req.user.id){
                    req.user.toReview.pop(i);

                    try{
                    const newReview = await Reviews.create({
                        reviewee : req.user.id,
                        reviewer : recipient.id,
                        content: req.query.newReview,
                    });

                    req.flash("success",` Review Sent to ${recipient.name}`)
                    return res.redirect('/');

                } catch(err){
                    console.log("Review not created!");
                }

                }
            }
            else{
                console.log("user not loggef in");
                req.flash('error','Please Login to Review !');
                return res.redirect('/user/sign-in');
            }
        }

        return res.redirect('/');
    }catch(err){
        console.log('Error in fetching Review',err);
        return;
    }
}