const express = require('express');

const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/adminController');

router.get('/assignWork' ,passport.checkAuthentication , adminController.assignWork);

router.get('/view-employees' ,passport.checkAuthentication , adminController.employeeList);

router.get('/addEmployee',adminController.addEmployee)

router.post('/create', passport.checkAuthentication,adminController.create);

router.get('/deleteEmployee/:id', passport.checkAuthentication , adminController.deleteEmployee);

router.post('/setreview',passport.checkAuthentication,adminController.setReviews);

router.post('/newAdmin',passport.checkAuthentication,adminController.newAdmin);

module.exports = router;