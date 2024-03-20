const express = require('express');
const router = express.Router();
const inventoriesController = require('../controllers/inventoriescontroller');

// POST route to create inventories for the next 5 days
router.post('/createInventories/:restaurant_id', inventoriesController.createInventoriesForNext5Days);

module.exports = router;
