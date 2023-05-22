const express = require('express');

const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.post('/create',userController.create);
router.get('/sign-up',userController.signUP);
router.get('/sign-in',userController.signIN);
router.post('/create-session',passport.authenticate('local',{
    failureRedirect: '/user/sign-in'
}),userController.createSession);
router.use('/review',require('./review'));

module.exports = router;