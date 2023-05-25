// Importing models
const User = require('../models/user');
const Reviews = require('../models/review');

// Redirect to assign work page
module.exports.assignWork = async function(req,res){

    // Finds all employee
    let employee = await User.find({});
    
     // Sends the date to assign work page
    return res.render('assignTask',  {
        title : 'Assign Work',
        employee : employee
    });
};

// Shows Employee list
module.exports.employeeList = async function(req,res){
    
    // Finds all employee
    let employeeList = await User.find({});
    
    // Sends the date to employee list page
    return res.render('employee_list', {
        title : "Employee List",
        employees : employeeList
    });
};

// Create's new employee
module.exports.create = async function(req,res){
    
    try{

        //If password doesn't match
        if(req.body.password != req.body.confirm_password){
            req.flash("error",'Please enter the same password in confirm password');
            return res.redirect('back');
        }
        
        //If user exists
        let existingUser = await User.findOne({ email: req.body.email });
        
        // Create new user if it doesn't exist
        if(existingUser){
            req.flash("error","Empoyee's email id is already in the database!");
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
            req.flash("success","Employee's Account Created");
            return res.redirect('/admin/view-employees');
        }
    } catch (err){
        //On failure
        console.log("Error in creating User",err);
        req.flash("error",'Error in creating User');
        return res.redirect('back');
    }
    
};

// Redirect to add employee pages
module.exports.addEmployee = function(req,res){
    return res.render('addEmployee',{
        title : 'Add Employee'
    })
};


// Removes empoyee from ERS
module.exports.deleteEmployee = async function(req,res){
    
    try{
        // Finds the employee by id and removes it
        let employee = await User.findByIdAndDelete(req.params.id);
        
        // On success
        req.flash('success' , 'User Deleted!')
        return res.redirect('back')

    } catch(err){
        // On Failure
        req.flash("error",err);
        return res.redirect('back');
    }
};


// Set the reviewee and reviewer
module.exports.setReviews = async function(req,res){
    
    try{
    
        // Check if the reviewer and reviewee are same
        if(req.body.sender == req.body.receiver){
            
            // Throws error is same
            req.flash('error' , 'Sender and reciver should not be same !!');
            return res.redirect('back');
        }
        
        // Gets sender and receiver
        let sender = await User.findById(req.body.sender);
        let receiver = await User.findById(req.body.receiver);
        
        // adds to sender to review
        sender.toReview.push(receiver);
        sender.save();
        
        // adds review after it's reviewed
        receiver.reviewFrom.push(sender);
        receiver.save();
        
        // On success
        req.flash('success', 'Task Assigned !!');
        return res.redirect('back');
        
    }catch(err){
        // On failure
        console.log("error",err);
        return res.redirect('back');
    }
}

// Makes employee admin
module.exports.newAdmin = async function(req,res){
    try{

        //checks if admin is performing the action
        if(req.user.isAdmin){

            //Finds employee
            let user = await User.findById(req.body.selectedUser);

            // If the fetched employee doesn't exist
            if(!user){
                // Throws error
                req.flash('error',"Employee Doesn't Exist !!");
                return res.redirect('back');
            }

            //Makes Admin and saves it in the database
            user.isAdmin = true ;
            user.save();

            // Fetxhes employee's name
            let name = user.name;
            
            // On success
            req.flash('success' , `${name} has been made Admin!!`);
            return res.redirect('/admin/view-employees');
        }

    } catch(err){

        // on failure
        console.log(err);
        return res.redirect('back');
    }
}