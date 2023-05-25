const express = require('express');

const router = express.Router();
const passport = require('passport');

//Importing admin controller
const adminController = require('../controllers/adminController');

// Admin can assign work to employee
router.get('/assignWork' ,passport.checkAuthentication , adminController.assignWork);

// Admin can view Employee list
router.get('/view-employees' ,passport.checkAuthentication , adminController.employeeList);

//Redirect to create new user
router.get('/addEmployee',adminController.addEmployee)

// Admin can add new employee
router.post('/create', passport.checkAuthentication,adminController.create);

// Admin can remove employee via thier id
router.get('/deleteEmployee/:id', passport.checkAuthentication , adminController.deleteEmployee);

//Admin can choose who can review
router.post('/setreview',passport.checkAuthentication,adminController.setReviews);

// Admin can make an employee an Admin
router.post('/newAdmin',passport.checkAuthentication,adminController.newAdmin);

module.exports = router;