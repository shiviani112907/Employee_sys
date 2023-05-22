const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create',userController.create);
router.get('/sign-up',userController.signUP);
router.post('/sign-in',userController.signIN);
router.use('/review',require('./review'));

module.exports = router;