const express = require('express');

const router = express.Router();

//Importing Review controller
const reviewController = require('../controllers/reviewController');

// Send/Recieve reviews
router.get('/new-review/:id',reviewController.List);


module.exports = router;