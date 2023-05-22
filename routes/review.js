const express = require('express');

const router = express.Router();
const userController = require('../controllers/reviewController');

router.get('/',userController.create);


module.exports = router;