const express = require('express');

const router = express.Router();

//Importing home controller
const homeController = require('../controllers/homeController');

router.get('/',homeController.home);

// Redirecting to User routes
router.use('/user',require('./user'));
// Redirecting to Admin routes
router.use('/admin',require('./admin'));
// Redirecting to Review routes
router.use('/review',require('./review'));

module.exports = router;