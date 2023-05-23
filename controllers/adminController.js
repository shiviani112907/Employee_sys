const User = require('../models/user');
const Reviews = require('../models/review');

module.exports.assignWork = async function(req,res){
    let employee = await User.find({});
    
    return res.render('assignTask',  {
        title : 'Assign Work',
        employee : employee
    });
};

module.exports.employeeList = async function(req,res){
    
    let employeeList = await User.find({});
    
    return res.render('employee_list', {
        title : "Employee List",
        employees : employeeList
    });
};

module.exports.create = async function(req,res){
    
    try{
        if(req.body.password != req.body.confirm_password){
            req.flash("error",'Please enter the same password in confirm password');
            return res.redirect('back');
        }
        
        let existingUser = await User.findOne({ email: req.body.email });
        
        if(existingUser){
            req.flash("error","Empoyee's email id is already in the database!");
            return res.redirect('back');
        }
        else{
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false
            });
            
            req.flash("success","Employee's Account Created");
            return res.redirect('/admin/view-employees');
        }
    } catch (err){
        // console.log("Error in creating User",err);
        req.flash("error",err);
        return res.redirect('back');
    }
    
};

module.exports.addEmployee = function(req,res){
    return res.render('addEmployee',{
        title : 'Add Employee'
    })
};

module.exports.deleteEmployee = async function(req,res){
    
    try{
        let employee = await User.findByIdAndDelete(req.params.id);
        console.log(employee);
        
        
        
        req.flash('success' , 'User Deleted!')
        return res.redirect('back')
    } catch(err){
        req.flash("error",err);
        return res.redirect('back');
    }
};

module.exports.setReviews = async function(req,res){
    
    try{
        
        let employee = User.findById(req.user.id);
        
        if(req.body.sender == req.body.receiver){
            
            req.flash('error' , 'Sender and reciver should not be same !!');
            return res.redirect('back');
        }
        
        let sender = await User.findById(req.body.sender);
        let receiver = await User.findById(req.body.receiver);
        
        sender.toReview.push(receiver);
        sender.save();
        
        receiver.reviewFrom.push(sender);
        receiver.save();
        
        req.flash('success', 'Task Assigned !!');
        return res.redirect('back');
        
    }catch(err){
        console.log("error",err);
        return res.redirect('back');
    }
}


module.exports.newAdmin = async function(req,res){
    try{

        if(req.user.isAdmin){
            let user = await User.findById(req.body.selectedUser);

            if(!user){
                req.flash('error',"Employee Doesn't Exist !!");
                return res.redirect('back');
            }

            user.isAdmin = true ;
            user.save();
            let name = user.name;
            req.flash('success' , `${name} has been made Admin!!`);
            return res.redirect('/admin/view-employees');
        }

    } catch(err){
        console.log(err);
        return res.redirect('back');
    }
}