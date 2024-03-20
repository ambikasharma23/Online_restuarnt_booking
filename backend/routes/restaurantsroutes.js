const express = require('express');
const router = express.Router();
const restaurantscontroller = require('../controllers/restaurantscontroller');
const {verifyToken} = require('../middleware/authmiddleware');


router.get('/select', restaurantscontroller.selectAll);
router.post('/insert',verifyToken,restaurantscontroller.insert);
router.get('/byId/:id', restaurantscontroller.byId)
router.get('/:restaurant_id',restaurantscontroller.getRestaurantData);

router.get('/:restaurant_id/details', restaurantscontroller.getRestaurantData);
router.get('/:restaurant_id/availableDates', restaurantscontroller.getAvailableDates);
router.get('/:restaurant_id/slotsByDate/:selectedDate', restaurantscontroller.getSlotsByDate);
module.exports = router;
