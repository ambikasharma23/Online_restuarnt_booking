const express = require('express');
const router = express.Router();
const { Restaurants, Slot } = require('../models');
const slotsController = require('../controllers/slotscontroller');


router.get('/:restaurantId', slotsController.getAllSlotsByRestaurantId);


router.post('/restaurant/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const { start_time, end_time, capacity } = req.body;
  
  try {
    // Fetch the restaurant details using the provided restaurantId
    const restaurant = await Restaurants.findByPk(restaurantId);
  
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Parse start time and end time strings to Date objects
    const startTime = new Date(`1970-01-01T${start_time}`);
    const endTime = new Date(`1970-01-01T${end_time}`);
    
    const slots = [];
  
    // Generate slots at 30-minute intervals
    for (let time = startTime; time < endTime; time.setMinutes(time.getMinutes() + 90)) {
      const adjustedEndTime = new Date(time.getTime() + (90 * 60 * 1000));

      const slot = {
        restaurant_id: restaurantId,
        start_time: time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }), // Format as HH:mm:ss
        end_time: adjustedEndTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }), // Format as HH:mm:ss
        capacity: capacity,
      };
      slots.push(slot);
    }

    // Insert slots into the database
    await Slot.bulkCreate(slots);
  
    console.log('Slots created successfully.');
  
    return res.status(200).json({ message: 'Slots created successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


  

module.exports = router;