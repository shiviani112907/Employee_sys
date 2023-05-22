const Reviews = require('../models/review');

module.exports.create = function(req,res){
    return res.render('review',{
        title: "Review"
    })
}