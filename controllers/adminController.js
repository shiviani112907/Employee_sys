const User = require('../models/user');
const Reviews = require('../models/review');

module.exports.home = async function(req,res){
    let user = await User.findOne({email:req.body.email});
    return res.render('admin',{
        title : 'Admin View',
        user : user
    });
};