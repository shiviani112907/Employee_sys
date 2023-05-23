const express = require('express');

const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/new-review/:id',reviewController.List);


module.exports = router;