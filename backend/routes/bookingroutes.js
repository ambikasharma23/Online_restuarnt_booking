const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingcontroller');
const {verifyToken} = require('../middleware/authmiddleware');


// Create a booking (requires a valid token)
router.post('/createBooking',verifyToken, bookingController.createBooking);

module.exports = router;
