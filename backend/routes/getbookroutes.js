// getBookRoute.js

const express = require('express');
const router = express.Router();
const getBookController = require('../controllers/getbookcontroller');

// Use GET method instead
router.get('/get-bookings/:customer_id', getBookController);

module.exports = router;
