const asyncHandler = require('express-async-handler');
const { sequelize,Restaurants, Slot,Inventory } = require('../models');

const getAllSlotsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Find the restaurant by its ID
    const restaurant = await Restaurants.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Find all slots associated with the restaurant
    const slots = await Slot.findAll({ where: { restaurant_id: restaurantId } });

    // Construct the response JSON object
    const response = {
      Restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.image,
        location: restaurant.location,
        cuisine_type: restaurant.cuisine_type,
        createdAt: restaurant.createdAt,
        updatedAt: restaurant.updatedAt
      },
      Slots: slots
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = {
  getAllSlotsByRestaurantId
};
