// getBookController.js

const { Booking, Slot, Restaurants } = require('../models');

const getBookController = async (req, res) => {
  try {
    const { customer_id } = req.params;

    // Validate customer_id
    if (!customer_id) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Fetch bookings based on customer_id
    const bookings = await Booking.findAll({
      attributes: ['id', 'slot_id', 'booking_date', 'num_guests'], 
      where: { customer_id },
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for the specified customer' });
    }

    // Extract slot_id from bookings and fetch associated information
    const bookingDetails = await Promise.all(
      bookings.map(async (booking) => {
        const { slot_id, booking_date, num_guests } = booking;

        // Fetch slot information, including start_time
        const slot = await Slot.findByPk(slot_id, {
          attributes: ['restaurant_id', 'start_time'],
          include: [
            {
              model: Restaurants,
              attributes: ['name'],
            },
          ],
        });

        return {
          booking_id: booking.id,
          slot_id,
          booking_date,
          num_guests,
          restaurant_id: slot.restaurant_id,
          restaurant_name: slot.Restaurant.name,
          start_time: slot.start_time,
        };
      })
    );

    res.status(200).json({ bookings: bookingDetails });
  } catch (error) {
    console.error('Error in getBookController:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getBookController;
